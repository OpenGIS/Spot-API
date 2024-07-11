<template>
  <div>
    <input v-model="feedId" placeholder="Enter Feed ID" />
    <button @click="getMessages">Fetch Messages</button>

    <div v-if="error" class="error">{{ error }}</div>

    <div id="map" class="map"></div>

    <pre>{{ messages }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { fetchSpotMessages } from "@/main.js";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const feedId = ref("");
const messages = ref([]);
const error = ref(null);
const map = ref(null);
const markers = ref([]);
const lineStringSource = ref(null);

const getMessages = async () => {
  try {
    error.value = null;
    messages.value = await fetchSpotMessages(feedId.value);
  } catch (err) {
    error.value = err.message;
  }
};

const updateMap = (newMessages) => {
  // Remove existing markers
  markers.value.forEach((marker) => marker.remove());
  markers.value = [];

  const coordinates = [];

  // Add new markers and collect coordinates
  newMessages.forEach((message) => {
    const { latitude, longitude } = message;
    if (latitude && longitude) {
      const marker = new maplibregl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map.value);
      markers.value.push(marker);
      coordinates.push([longitude, latitude]);
    }
  });

  // Update LineString
  if (coordinates.length > 1) {
    if (map.value.getSource("trackingLine")) {
      map.value.getSource("trackingLine").setData({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates,
        },
      });
    } else {
      map.value.addSource("trackingLine", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates,
          },
        },
      });

      map.value.addLayer({
        id: "trackingLine",
        type: "line",
        source: "trackingLine",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#ff0000",
          "line-width": 2,
        },
      });
    }

    // Fit map to the bounds of the coordinates
    const bounds = coordinates.reduce(
      (b, coord) => b.extend(coord),
      new maplibregl.LngLatBounds(coordinates[0], coordinates[0]),
    );
    map.value.fitBounds(bounds, { padding: 20 });
  }
};

onMounted(() => {
  map.value = new maplibregl.Map({
    container: "map",
    style: "https://demotiles.maplibre.org/style.json",
    center: [0, 0],
    zoom: 2,
  });

  map.value.on("load", () => {
    if (messages.value.length) {
      updateMap(messages.value);
    }
  });
});

watch(messages, (newMessages) => {
  if (map.value) {
    updateMap(newMessages);
  }
});
</script>

<style>
.map {
  width: 100%;
  height: 400px;
}
.error {
  color: red;
}
</style>
