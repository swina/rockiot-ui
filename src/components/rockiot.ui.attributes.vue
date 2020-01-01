<template>
    <div class="rockiot-attributes" :style="'height:' + height + ';'">
        <div class="rockiot-attributes-buttons">
            <button @click="$emit('attributes')">Close</button> 
            <button @click="getHTML">Code</button>
            <button @click="getJSON">JSON</button>
            <button  @click="update">Apply</button>

        </div>    
        <div>ID: {{$attrs.serial}} [{{$attrs.type}}]-[{{$attrs.variation}}]</div>

        <div v-if="attributes" style="margin-top:.4rem;" class="rockiot-attributes-lines">
            Attributes
            <div class="rockiot-attributes-title" @click="currentTab='common'">
                <div>common</div>
                <div>
                    <svg width="10" height="10">
                        <line x1="0" y1="0" x2="5" y2="5" stroke-width="2" stroke="#fff"/>
                        <line x1="5" y1="5" x2="10" y2="0" stroke-width="2" stroke="#fff"/>
                    </svg>
                </div>
            </div>
            <transition name="fade">
                <div :class="collapsable('common')" ref="common">
                    <template v-for="(common,i) in attributes.common">
                        <div :key="'attr_' + i" class="rockiot-attribute">
                            <div>{{fromCamel(common)}}</div>
                            <input class="rockiot-attributes-input" type="text" v-model="data[common]"/>    
                        </div>
                    </template>
                </div>    
            </transition>
            <div class="rockiot-attributes-title" @click="currentTab=$attrs.variation" v-if="attributes[$attrs.variation]">
                <div>{{$attrs.variation}}</div>
                <div>
                    <svg width="10" height="10">
                        <line x1="0" y1="0" x2="5" y2="5" stroke-width="2" stroke="#fff"/>
                        <line x1="5" y1="5" x2="10" y2="0" stroke-width="2" stroke="#fff"/>
                    </svg>
                </div>
            </div>    
            <transition name="fade">
                <div :class="collapsable($attrs.variation)"  :ref="$attrs.variation">
                    
                    <template v-for="(element,index) in attributes[$attrs.variation]">
                        <div :key="'attr_' + $attrs.variation + '_' + index" class="rockiot-attribute">
                            <div>{{fromCamel(element)}}</div> 
                            <input class="rockiot-attributes-input" type="text" v-model="data[element]"/>
                        </div>
                    </template>
                </div>
            </transition>
        </div>
        <div v-if="viewCode">
            <div>Copy and paste in your HTML</div>
            <textarea class="rockiot-attributes-code" ref="htmlcode" v-model="tagcode"></textarea>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import { settings , setHTMLAttributes } from '../plugins/rockiot.settings'

export default {
    name: 'RockiotAttributes',
    data:()=>({
        data: null,
        show: false,
        attributes: null,
        currentTab:'',
        classe: 'rockiot-ui-collapsable',
        viewCode: false,
        tagcode: ''
    }),
    props: {
        display: { required: false, default: false }
    },
    watch: {
        display(v){
            this.show = v
        },
        currentTab(v){
            
            v != '' ? this.viewCode = false : this.viewCode = true
        }
    },
    computed:{
        height(){
            return this.display ? '100vh;' : '0vh;'
        }
    },
    methods:{
         collapsable(ref){
             if ( this.currentTab === ref ){
                 return 'rockiot-ui-collapse'
             }
            return 'rockiot-ui-collapsable'
        },
        update(){
            setHTMLAttributes(this.data.serial,this.data)
            this.$emit('setting')
        },
        fromCamel(str){
            return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
        },
        
        getHTML(){
            this.tagcode = '<rockiot-ui \nid=\"' + this.$attrs.serial + '\"\n'
            this.tagcode += 'type=\"' + this.$attrs.type + '\"\n'
            this.tagcode += 'variation=\"' + this.$attrs.variation  + '\"\n'
            this.tagcode += 'orientation=\"' + this.$attrs.orientation  + '\"\n'
            Object.keys(this.attributes).forEach((attr)=>{
                this.currentTab = ''
                //this.$refs[attr] ? this.$refs[attr].className = 'rockiot-attributes-collapsable' : null
                this.attributes[attr].forEach( (key) => {
                    if ( attr === 'common' || attr === this.$attrs.variation ){
                        this.tagcode += this.fromCamel(key) + '=\"' + this.data[key] + '\" \n'
                    }    
                })
            })
            this.tagcode += '></rockiot-ui>'
            this.viewCode =! this.viewCode
        },
        getJSON(){
            let attribs = { 
                id: this.$attrs.serial , 
                serial: this.$attrs.serial , 
                type: this.$attrs.type , 
                variation: this.$attrs.variation,
                orientation: this.$attrs.orientation
            }
            Object.keys(this.attributes).forEach((attr)=>{
                this.attributes[attr].forEach( (key) => {
                    if ( attr === 'common' || attr === this.$attrs.variation ){
                        attribs[this.fromCamel(key)] = this.data[key] 
                    }    
                })
            })
            this.tagcode = JSON.stringify(attribs)

            console.log ( attribs )
        }
    },
    mounted(){
        this.attributes = settings.attribs
        this.data = this.$attrs
    }
}
</script>

<style scope>
button {
    background:#000;
    color:#fafafa;
    border:0;
    outline:none;
    border-radius:.1rem;
    cursor:pointer;
    padding:4px 6px 4px 6px;
    font-size:.8rem;
    font-family:monospace;
}
button:hover {
    background: #fafafa;
    color:#000;
}
.rockiot-attributes {
    text-align:left;
    padding:.5rem;
    position:fixed;
    right:0;
    top:0;
    z-index:1000;
    width:20rem;
    background:rgb(46, 46, 46);
    color:#fafafa;
    opacity:1;
    transition: all 1s linear;
}

.rockiot-attributes-buttons {
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content: flex-end;
}

.rockiot-attributes-buttons > button {
    margin-left:.2rem;
}

.rockiot-attributes-title {
    text-transform: capitalize;
    font-weight:1.1rem;
    border-bottom:1px solid #fafafa;
    border-top:1px solid #fafafa;
    background:#444;
    padding:.7rem;
    margin-bottom:.2rem;
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    cursor:pointer;
}

.rockiot-attributes-lines {
    display:flex;
    flex-direction:column;
}


.rockiot-attribute {
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    border-bottom:1px solid #444;
    padding:.1rem;
    align-items:center;
    cursor:pointer;
}

.rockiot-attribute:hover {
    background:#000;
}


.rockiot-attributes-input {
    background: transparent;
    color:#fafafa;
    border:0;
    outline: none;
    padding:.2rem;
}

.rockiot-attributes-input:focus {
    background:#cdcdcd;
    color:#000;
    border-radius:.2rem;
    border:0;
    outline:none;
}

.rockiot-attributes-code {
    width: 95%;
    min-height:20rem;
    padding:.3rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>