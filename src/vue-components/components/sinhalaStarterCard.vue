<template>
    <section class="sinhala-starter" :class="{ compact }" :aria-label="$t('sinhalaStarterTitle')">
        <div v-if="createUser" class="language-choice">
            <label for="starter-language">{{ $t('sinhalaLanguageChoice') }}</label>
            <select id="starter-language" v-model="language" @change="changeLanguage">
                <option value="si">සිංහල</option>
                <option value="en">English</option>
            </select>
        </div>
        <template v-if="!compact">
            <h3>{{ $t('sinhalaStarterTitle') }}</h3>
            <p>{{ $t('sinhalaStarterDescription') }}</p>
            <p class="sentence-example" lang="si">මට <span aria-hidden="true">→</span> වතුර <span aria-hidden="true">→</span> ඕනේ</p>
        </template>
        <button type="button" class="start-button" @click="start" :disabled="loading" :aria-busy="loading">
            <i class="fas" :class="loading ? 'fa-spinner fa-spin' : 'fa-comments'" aria-hidden="true"></i>
            {{ $t(createUser ? 'startSinhala' : 'addSinhalaBoards') }}
        </button>
        <template v-if="!compact">
            <button type="button" @click="testVoice">{{ $t('testSinhalaVoice') }}</button>
            <p class="voice-hint">{{ $t('sinhalaVoiceHint') }}</p>
            <details>
                <summary>{{ $t('sinhalaAndroidVoiceTitle') }}</summary>
                <p>{{ $t('sinhalaAndroidVoiceSteps') }}</p>
            </details>
            <details>
                <summary>{{ $t('sinhalaCaregiverGuide') }}</summary>
                <p>{{ $t('sinhalaCaregiverHint') }}</p>
            </details>
        </template>
        <p v-if="error" role="alert">{{ $t('sinhalaStarterError') }}</p>
    </section>
</template>

<script>
import { sinhalaStarterService } from '../../js/service/boards/sinhalaStarterService';
import { loginService } from '../../js/service/loginService';
import { localStorageService } from '../../js/service/data/localStorageService';
import { i18nService } from '../../js/service/i18nService';
import { speechService } from '../../js/service/speechService';
import { Router } from '../../js/router';

export default {
    props: { createUser: Boolean, compact: Boolean },
    data() {
        return { loading: false, error: false, userCreated: false, language: i18nService.getAppLang() };
    },
    methods: {
        async changeLanguage() { await i18nService.setAppLanguage(this.language); },
        async start() {
            if (this.loading) return;
            this.loading = true;
            this.error = false;
            try {
                if (this.createUser && !this.userCreated) {
                    const username = localStorageService.getNextAutoUserName();
                    await loginService.registerOffline(username, username);
                    this.userCreated = true;
                }
                const homeId = await sinhalaStarterService.install();
                Router.toGrid(homeId);
            } catch (error) {
                this.error = true;
                console.warn('Sinhala starter setup failed', error);
            } finally { this.loading = false; }
        },
        testVoice() { speechService.speak('ආයුබෝවන්. අපි එකට කතා කරමු.', {lang: 'si'}); }
    }
};
</script>

<style scoped>
.sinhala-starter { padding: 1.5rem; margin: 1rem 0 2rem; border: 2px solid #29766a; border-radius: 1rem; background: #f2f8f1; color: #183d37; }
.sinhala-starter.compact { padding: 0.75rem 1rem; margin: 0.5rem 0; }
.sinhala-starter h3 { margin-top: 0.5rem; }
.sinhala-starter p { max-width: 60ch; line-height: 1.7; }
.language-choice { display: flex; align-items: center; justify-content: flex-end; gap: 0.75rem; flex-wrap: wrap; }
.language-choice select, .language-choice label { margin: 0; }
.sinhala-starter button { min-height: 48px; white-space: normal; height: auto; line-height: 1.7; padding: 0.65rem 1rem; margin: 0.25rem 0.5rem 0.25rem 0; letter-spacing: normal; }
.start-button { background: #146b60; color: #fff; border-color: #146b60; font-weight: 700; }
.start-button:hover, .start-button:focus { background: #104f48; color: #fff; }
.start-button:disabled { opacity: 0.6; }
.sentence-example { font-size: 1.5rem; font-weight: 700; }
.sentence-example span { padding: 0 0.4rem; }
.voice-hint { font-size: 0.9rem; }
summary { cursor: pointer; min-height: 44px; line-height: 1.8; }
button:focus-visible, summary:focus-visible { outline: 3px solid #bb5a09; outline-offset: 3px; }
@media (max-width: 480px) { .sinhala-starter { padding: 1rem; } .sinhala-starter button { width: 100%; } }
</style>
