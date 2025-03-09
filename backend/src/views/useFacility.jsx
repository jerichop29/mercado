import { useState, useEffect } from "react";
import FacilitiesHandler from "../controllers/js/FacilitiesHandler";
export const useFacility =(facility)=>{
    const [pinnedEvents, setPinnedEvents] = useState({});
    const fetchPinnedEvents = async () => {
        try {
            const response = await FacilitiesHandler.getFacilities(facility.id);
            const events = response.data.reduce((acc, event) => {
                const dateStr = new Date(event.Event_Date).toLocaleDateString("en-CA");
                if (!acc[dateStr]) {
                    acc[dateStr] = [];
                }
                acc[dateStr].push(event.Event_Name);
                return acc;
            }, {});
            setPinnedEvents(events);
        } catch (error) {
            console.error('Error fetching pinned events:', error);
        }
    };
    useEffect(() => {
        fetchPinnedEvents();
    }, []);
return {pinnedEvents};
}