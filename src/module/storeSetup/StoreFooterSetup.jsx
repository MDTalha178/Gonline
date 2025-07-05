import FooterSetupComponent from "../../component/gonline/storeSetup/FooterSetupComponent"

const StoreFooterSetup = () =>{
    const handleInputChange = () =>{
        console.log('input changed')
    }
    return(
        <FooterSetupComponent handleOnChange={handleInputChange}/>
    )
}

export default StoreFooterSetup;