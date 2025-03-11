import ComplaintHistory from "../../components/user/ComplaintHistory";

export default function ComplaintHistoryPage() {

    const History = [
      {
        id: 1,
        category: "Maintenance Issues",
        subCategory: "Electrical",
        details: "The lights in the bathroom are flickering.",
        file: "hello.jpg",
      }
    ];
    return (
      <>
        <ComplaintHistory History={History}/>
      </>
    );
  }