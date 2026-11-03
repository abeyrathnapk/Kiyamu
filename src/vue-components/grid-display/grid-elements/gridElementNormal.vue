<template>
    <div class="grid-item-content">
        <grid-element-image :metadata="metadata" :grid-image="displayImage"/>
        <grid-element-text-container v-if="!(gridElement.additionalProps && gridElement.additionalProps.sinhalaToolbar)" :with-image="!!imageData" :metadata="metadata" :grid-element="gridElement" v-bind="$attrs"/>
    </div>
</template>

<script>
    import { getUpdatedSinhalaSymbol } from "../../../js/service/boards/sinhalaSymbols";
import GridElementTextContainer from './gridElementTextContainer.vue';
import { TextConfig } from '../../../js/model/TextConfig';
import GridElementImage from './gridElementImage.vue';

export default {
    components: { GridElementImage, GridElementTextContainer },
    props: ["gridElement", "metadata"],
    data() {
        return {
            TextConfig: TextConfig
        }
    },
    computed: {
        displayImage() {
            const image = this.gridElement.image;
            return image && image.data ? {...image, data: getUpdatedSinhalaSymbol(image.data, this.metadata?.colorConfig?.kiyamuIconBacking === true)} : image;
        },
        imageData() {
            return this.gridElement.image ? getUpdatedSinhalaSymbol(this.gridElement.image.data || this.gridElement.image.url) : null;
        },
    },
    methods: {
    },
    mounted() {
    }
}
</script>

<style scoped>
</style>