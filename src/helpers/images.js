export const fileUpload = (file, ref) => {
    // tenemos filereader para crear nuestra img 

    const img = new FileReader()
    console.log(ref);

    img.readAsDataURL(file) 
    img.addEventListener('load', () => {

        ref.current.src = img.result;
    })


}