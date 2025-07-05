import UpComingDealsComponent from "../../component/gonline/storeSetup/UpComingDealsComponent"

const UpComingDealsSetup = ({storeID}) =>{

    const handleInputChange = () => {
        console.log('input changed')
    }
    return(
        <UpComingDealsComponent  handleInputChange={handleInputChange}/>
    )
}

export default UpComingDealsSetup;