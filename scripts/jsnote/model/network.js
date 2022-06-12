
export const getPublicSamples = async () => { 
  try{
    const publicSample  = await fetch("./sample/public/list.json")
    if(publicSample.status ==200){
      const publicList = await publicSample.json()
      return publicList
    }
    else{
      console.log("server error")
      return []
    }
  }
  catch(e){
    console.log("http request error")
    return []
  }
}

export const getPrivateSamples = async () => { 
  try{
    const privateSample = await fetch("./sample/private/sample.json")
    if(privateSample.status ==200){
      const privateList = await privateSample.json()
      return privateList
    }
    else{
      console.log("server error")
      return []
    }
  }
  catch(e){
    console.log("http request error")
      return []
  }
}

export const postRegister = async (json)=> {
  try{
    const url = "./node/jsnoteregister"
    const data = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    }

    const res = await fetch(url,data)
  }
  catch(e){
    console.log("register is not working now.")
    console.log(e.message)
  }


}

