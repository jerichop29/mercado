import PageTitle from "../../../components/main/PageTitle/PageTitle"

import Building from "../../../components/main/Stalls/Building/Building"
const MODELS = [
    { id: 'B4_4-v1', label: '1' },
    // Add more models as needed
  ];

export default function Building4Page(){
    return (
        <>
            <PageTitle />
            <Building models={MODELS}/>
        </>
    )
}