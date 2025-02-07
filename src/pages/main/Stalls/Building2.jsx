import Building from "../../../components/main/Stalls/Building/Building"
const MODELS = [
    { id: 'B2_2-v1', label: '1' },
    // Add more models as needed
  ];

export default function Building2Page(){
    return (
        <>

            <Building models={MODELS}/>
        </>
    )
}