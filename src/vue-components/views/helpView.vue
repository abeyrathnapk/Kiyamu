<template>
    <div class="overflow-content">
        <header-icon full-header="true"></header-icon>
        <div class="container px-3 px-md-5 ms-0 col-12 col-md-10 col-xl-9 pt-4 pt-lg-5">
            <div class="row">
                <h1>{{ $t('help') }}</h1>
                <div>
                    <span>{{ $t('theFollowingRessourcesForHelpOnAstericsGrid') }}</span>:
                </div>
                <ul>
                    <li><a href="https://www.asterics.eu/manuals/asterics-grid/" target="_blank">{{ $t('userManual') }} <span>({{ 'lang.en' | translate }})</span></a></li>
                    <li v-if="currentLang !== 'es'"><a href="https://aulaabierta.arasaac.org/en/asterics-aac_home" target="_blank">{{ $t('arasaacTutorial') }} <span>({{ 'lang.en' | translate }})</span></a></li>
                    <li v-if="currentLang === 'es'"><a href="https://aulaabierta.arasaac.org/asterics-aac_inicio" target="_blank">{{ $t('arasaacTutorial') }} <span>({{ 'lang.es' | translate }})</span></a></li>
                    <li><a href="https://www.youtube.com/playlist?list=PL0UXHkT03dGrIHldlEKR0ZWfNMkShuTNz" target="_blank"><span>{{ $t('tutorialVideosOnYoutube') }}</span> <span>({{ 'lang.de' | translate }})</span></a></li>
                    <li><a href="https://www.youtube.com/channel/UCVIQETg6tIMu3SdEHaIftIw/videos" target="_blank"><span>{{ $t('tutorialVideosOnYoutube') }}</span> <span>(Jim Luther, {{ 'lang.en' | translate }})</span></a></li>
                </ul>
            </div>
                    </div>
        <div class="bottom-spacer"></div>
    </div>
</template>

<script>
    import HeaderIcon from '../../vue-components/components/headerIcon.vue'
    import {i18nService} from "../../js/service/i18nService.js";

    export default {
        components: {HeaderIcon},
        props: [],
        data() {
            return {
                currentLang: i18nService.getAppLang()
            }
        },
        methods: {
        },
        mounted() {
        }
    }
</script>

<style scoped>
    h2, h1 {
        margin-bottom: 0.5em;
    }
    h3 {
        margin-bottom: 0.5em;
        margin-top: 1.5em;
    }
    li {
        margin-top: 0.5em;
    }
    ul {
        list-style-position: outside;
        padding-left: 2em;
        margin-top: 1em;
    }
</style>