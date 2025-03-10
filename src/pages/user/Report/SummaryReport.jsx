import SummaryReportGraph from "../../../components/user/Report/SummaryReportGraph"
import SummaryReportCard from "../../../components/user/Report/SummaryReportCard"

export default function SummaryReportPage(){
    return(
        <div className="row g-4 m-4">
        <SummaryReportCard />
        <SummaryReportGraph />
        </div>
    )
}