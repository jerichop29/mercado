import Building from "../../../components/main/Stalls/Building/Building"

const MODELS = [
    { id: 'B1_1-v1', label: '1' },
    // Add more models as needed
  ];

export default function Building1Page(){
    return (
        <>
           
           <Building models={MODELS}/>
        </>
    )
}