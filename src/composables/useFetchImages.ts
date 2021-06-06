import { ref, reactive, computed } from 'vue'
import { random } from 'lodash'
import { sleep } from '@/utils/utils'
import axios from 'axios'

export default function useFetchImages(url: string) {
    const images = reactive<string[]>([])
    const imageSize = ref(0)
    async function fetchImages() {
        imageSize.value = random(10, 25)
        images.splice(0, images.length)
        for (let i = 0; i < imageSize.value; i++) {
            const resp = await axios.get(url)
            images.push(resp.request.responseURL)
            await sleep(random(450, 800))
        }
    }
    const fetchFinished = computed(() => {
        return imageSize.value == images.length
    })

    return {
        images,
        imageSize,
        fetchFinished,
        fetchImages
    }
}