<template>
    <div class="x-info text-center">
        <div class="x-info-wrap">
            <div>
                <Icon :type="getIcon" :size="120" :color="iconColor"></Icon>
            </div>
            <p v-if="text">
                {{text}}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'x-info',
        props: {
            type: {
                type: String,
                default: 'warning',
                validator: function (value) {
                    let val = value || 'default';
                    return ['success', 'warning', 'danger'].indexOf(val) !== -1
                }
            },
            text: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                iconMap: {
                    warning: 'ios-alert-outline',
                    success: 'ios-checkmark-circle-outline',
                    danger: 'ios-close-circle-outline'
                },
                iconColorMap: {
                    warning: '#ff9900',
                    success: '#19be6b',
                    danger: '#ed4014'
                }
            }
        },
        computed: {
            getIcon() {
                return this.iconMap[this.type];
            },
            iconColor() {
                return this.iconColorMap[this.type];
            }
        }
    }
</script>

<style lang="scss" scope>
    .x-info {
        width: 100%;
        padding: 70px 0;

        .x-info-wrap {
            display: inline-block;
            p {
                font-size: $fs-normal-x;
                color: $color-font-Sub;
                padding: 10px 0;
            }
            
        }
    }
 
</style>
