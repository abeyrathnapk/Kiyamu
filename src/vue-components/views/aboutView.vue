<template>
    <div class="overflow-content">
        <header-icon full-header="true"></header-icon>
        <div class="srow content spaced" style="max-width: 900px">
            <h2 class="twelve columns">{{ $t('aboutAstericsGrid') }}</h2>
            <div>
                <div class="srow">
                    <h3>Copyright and source code</h3>
                    <p>Kiyamu is a modified version of <a href="https://github.com/asterics/Asterics-AAC" target="_blank" rel="noopener">AsTeRICS AAC</a>, originally developed by Benjamin Klaus and the AsTeRICS contributors. Original copyright and license notices are preserved in the source distribution.</p>
                    <p>This version was modified on 2026-11-01 to use Kiyamu branding. Kiyamu is licensed under the GNU Affero General Public License, version 3. You may use, modify, and redistribute it under that license, without warranty.</p>
                    <p><a href="LICENSE" target="_blank">Read the license</a> ? <a href="SOURCE_CODE.md" target="_blank">Get the corresponding source code</a> ? <a href="NOTICE.md" target="_blank">Attribution notices</a></p>
                </div>
                <div class="srow">
                    <h3>{{ $t('termsOfServiceAndPrivacyPolicy') }}</h3>
                    <div>
                        <i18n path="astericsGridLicenseInfo" tag="p">
                            <template v-slot:agplLink>
                                <a href="https://github.com/asterics/Asterics-AAC/blob/master/LICENSE" target="_blank">AGPLv3</a>
                            </template>
                        </i18n>
                        <i18n path="ytTermsInfo" tag="p">
                            <template v-slot:ytTerms>
                                <a href="https://www.youtube.com/t/terms" target="_blank">{{ $t('youtubeTermsOfService') }}</a>
                            </template>
                            <template v-slot:googleTerms>
                                <a href="https://policies.google.com/privacy" target="_blank">{{ $t('googlePrivacyPolicy') }}</a>
                            </template>
                            <template v-slot:ytAPI>
                                <a href="https://developers.google.com/youtube/v3" target="_blank">{{ $t('youtubeDataApi') }}</a>
                            </template>
                        </i18n>
                        <i18n path="privacyPolicyInfo" tag="span">
                            <template v-slot:privacyPolicy>
                                <a href="app/privacy_en.html?back=about">{{ $t('privacyPolicy') }}</a>
                            </template>
                            <template v-slot:privacyPolicyDe>
                                <a href="app/privacy_de.html?back=about">{{ $t('privacyPolicy') }}</a>
                            </template>
                        </i18n>
                    </div>
                </div>
                <div class="srow">
                    <h3>{{ $t('acknowledgements') }}</h3>
                    <i18n path="thankBrowserstack" tag="div" class="mb-3">
                        <template v-slot:browserstackUrl>
                            <a target="_blank" href="https://www.browserstack.com//">browserstack.com</a>
                        </template>
                    </i18n>
                    <i18n path="thankResponsiveVoice" tag="div">
                        <template v-slot:responsiveVoiceUrl>
                            <a target="_blank" href="https://responsivevoice.org">ResponsiveVoice.org</a>
                        </template>
                    </i18n>
                    <div class="mb-3"><a href="https://responsivevoice.org">ResponsiveVoice-NonCommercial</a> {{ $t('licensedUnder') }} <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/"><img title="ResponsiveVoice Text To Speech" src="app/img/responsive-voice-license.png" alt="95x15" width="95" height="15" /></a></div>
                    <div>
                        {{ $t('thanksToEduardoLleidaSolanoProfessorAtDepartment') }}
                    </div>
                </div>
                <div class="srow" style="margin-top: 3em">
                    <i18n path="youreUsingAstericsGridVersion" tag="div">
                        <template v-slot:gridVersion>
                            <span>#ASTERICS_GRID_VERSION#</span>
                        </template>
                    </i18n>
                </div>
            </div>
        </div>
        <div class="bottom-spacer"></div>
    </div>
</template>

<script>
    import {Router} from "../../js/router";
    import HeaderIcon from '../../vue-components/components/headerIcon.vue'


    export default {
        components: {HeaderIcon},
        props: [],
        data() {
            return {
            }
        },
        methods: {
            toMain() {
                Router.toMain();
            },
            toRegister() {
                Router.toRegister();
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .content {
        display: flex;
        flex-direction: column;
        flex: 1 0 auto;
    }

    h2 {
        margin-bottom: 0.5em;
    }
    h3 {
        margin-bottom: 0.5em;
        margin-top: 1.5em;
    }
    .srow {
        margin-bottom: 1.5em;
    }
</style>