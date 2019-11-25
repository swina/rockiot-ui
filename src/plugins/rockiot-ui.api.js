export default function rockiotEvent(id,obj){
  document.getElementById(id).setAttribute('control-icons',JSON.stringify(obj))
  Object.keys(obj).map(icon=>{
    document.getElementById(id).addEventListener(icon.action,()=>{
      icon.callback
    })
  })
}
