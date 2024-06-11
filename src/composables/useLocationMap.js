import { ref } from "vue";

export default function useLocationMap() {

  const zoom = ref(12);
  const center = ref([41.4070993, 2.1429289])

  function pin(e) {
    const marker = e.target.getLatLng()
    center.value = [marker.lat, marker.lng]
  }

  return {
    zoom,
    center,
    pin,
  }
}