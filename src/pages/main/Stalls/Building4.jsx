import PageTitle from "../../../components/main/PageTitle/PageTitle"
<<<<<<< HEAD

=======
import Building from "../../../components/main/Stalls/Building/Building"
const MODELS = [
    { id: 'B4_4-v1', label: '1' },
    // Add more models as needed
  ];
>>>>>>> fb5749ce5f7e72d7f1e0135e787758e54dc32498
export default function Building4Page(){
    return (
        <>
            <PageTitle />
            <Building models={MODELS}/>
        </>
    )
}