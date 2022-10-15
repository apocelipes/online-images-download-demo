import { ref, Ref } from 'vue'
import { sleep, getZipName } from '@/utils/utils'
import JSZip from 'jszip'
import axios from 'axios'

async function removeDuplication(arr: string[]) {
    const ret: Set<string> = new Set()
    for (const elem of arr) {
        ret.add(elem)
        await sleep(300)
    }

    return ret
}

async function downloadImageWorker(imgs: Set<string>, downloadPercentage: Ref<number>) {
    let count = 0
    const zip = new JSZip()
    for (const img of imgs) {
        const resp = await axios.get<Blob>(img, {responseType: "blob"})
        const url = new URL(img)
        const filename = [url.pathname.replace('/', ''), url.searchParams.get('fm')].join('.')
        zip.file(filename, resp.data, {binary: true})
        downloadPercentage.value = ++count / imgs.size * 100
        await sleep(500)
    }

    return zip
}

async function downloadZip(zip: JSZip) {
    const zipData = await zip.generateAsync({type: "blob"})
    const aNode = document.createElement('a')
    aNode.download = getZipName()
    const content = URL.createObjectURL(zipData)
    aNode.href = content
    const clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    aNode.dispatchEvent(clickEvent)
    URL.revokeObjectURL(content)
}

export interface useDownloadReturnType {
    beginDownloading: Ref<boolean>,
    inPreparing: Ref<boolean>,
    downloadPercentage: Ref<number>,
    handleDownload(): Promise<void>
}

export default function useDownload(images: string[]): useDownloadReturnType {
    const beginDownloading = ref(false)
    const inPreparing = ref(false)
    const downloadPercentage = ref(0)
    async function handleDownload() {
        downloadPercentage.value = 100
        beginDownloading.value = true
        inPreparing.value = true
        const imgs = await removeDuplication(images)
        inPreparing.value = false
        downloadPercentage.value = 0

        await downloadZip(await downloadImageWorker(imgs, downloadPercentage))
        beginDownloading.value = false
    }

    return {
        beginDownloading,
        inPreparing,
        downloadPercentage,
        handleDownload
    }
}
