 async function getFileUrl(file)
 {
   

  
   const data=new FormData()
   data.append("file",file)
   data.append("upload_preset","upload_profile_pic")
   const type=returnFileType(file)
   try{
    const res=await fetch(`https://api.cloudinary.com/v1_1/ddfkwexvu/${type}/upload`,
      {
        method:"POST",
        body:data
      }
    )

    const result=await res.json();
    return result
   }
   catch(error)
   {
     console.log("failed to upload image",error)
   }
   finally
   {
    console.log("file uploaded succesfully")
   }
  
}
 function returnFileType(file)
{
  const type=file.type
  if(type.startsWith('image'))
  {
    return "image"
  }
  else if(type.startsWith('video'))

  {
    return "video"
  }
  else if(type.startsWith('application/pdf'))
  {
    return "pdf"
  }
  else
  {
    return null
  }
}

export {getFileUrl,returnFileType}













