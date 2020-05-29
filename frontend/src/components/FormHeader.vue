<template>
    <div>
        <header class="header">
            <figure class="header__icon-container">
                <HomeFormIcon :step='step'></HomeFormIcon>
                <AnimationObserver :modeler="{ textContent: titles[step] }"
                                :start="700"
                                :process="700"
                                :finish="500">
                    <figcaption class="header__icon-title"></figcaption>
                </AnimationObserver>
            </figure>

            <span class="header__counter">
                <AnimationObserver :modeler="{ textContent: step+1 }"
                                :start="300"
                                :process="700"
                                :finish="300">
                    <span class="header__count"></span>
                </AnimationObserver>
                /{{ titles.length }}
            </span>
        </header>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import HomeFormIcon from './HomeFormIcon.vue';
import AnimationObserver from './animation/AnimationObserver.vue';

export default {
    name: 'FormHeader',
    computed: {
        ...mapState(['step', 'titles']),
    },
    components: { HomeFormIcon, AnimationObserver }
}
</script>

<style lang="scss">
    .header {
        font-family: 'Roboto';

        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 35px 45px;

        background-color: #fff;

        z-index: 5;

        @media all and (max-width: 800px) {
            padding: 0 0 10px 25px;
        }
        @media all and (max-width: 600px) {
            padding: 0 0 0 15px;
        }

        &__icon-container {
            display: flex;
            align-items: center;

            padding: 0;
            margin: 0;
        }

        &__icon-title {
            font-size: 28px;
            font-weight: 300; 

            margin-left: 47px;

            color: #275178;

            opacity: 1;

            transition: all .4s ease;

            @media all and (max-width: 800px) {
                font-size: 24px;
                margin-left: 27px;
            }
            @media all and (max-width: 600px) {
                font-size: 24px;
                margin-left: 0;
            }
        }

        .animation-start &__icon-title {
            transform: translateY(-50%);
            opacity: 0;
        }
        .animation-process &__icon-title {
            transform: translateY(50%);
            opacity: 0;
        }
        .animation-finish &__icon-title {
            transform: translateY(0);
            opacity: 1;
        }


        &__count {
            transition: all .4s ease;
            opacity: 1;
        }

        .animation-start &__count {
            transform: translateY(-50%);
            opacity: 0;
        }
        .animation-process &__count {
            transform: translateY(50%);
        }
        .animation-finish &__count {
            transform: translateY(0);
            opacity: 1;
        }

        &__counter {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 26px;
            font-weight: bold;
            padding: 28px 40px 38px 50px;

            text-align: right;
            color: #fff;

            overflow: hidden;
            z-index: 7;

            @media all and (max-width: 800px) {
                font-size: 28px;
                padding: 14px 25px 22px 30px;
            }

            &:before {
                content: '';
                position: absolute;
                top: 0;
                right: -5px;
                width: 100%;
                height: 100%;

                background-image: url('../assets/counter_vector.svg');
                background-size: contain;
                background-repeat: no-repeat;

                z-index: -1;
            }
        }
    }
</style>