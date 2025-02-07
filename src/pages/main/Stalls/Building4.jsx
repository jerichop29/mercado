import Building from "../../../components/main/Stalls/Building/Building"
const MODELS = [
    { id: 'B4_4-v1', label: '1' },
    // Add more models as needed
  ];

export default function Building4Page(){
    return (
        <>

            <Building models={MODELS}/>
        </>
    )
}