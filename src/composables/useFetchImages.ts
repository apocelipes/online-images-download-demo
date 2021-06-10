import { ref, reactive, computed, Ref, ComputedRef } from 'vue'
import { sleep, random } from '@/utils/utils'
import axios from 'axios'

export interface useFetchImagesReturnType {
    images: string[],
    imageSize: Ref<number>,
    fetchFinished: ComputedRef<boolean>,
    fetchImages(): Promise<void>
}

export default function useFetchImages(url: string): useFetchImagesReturnType {
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
