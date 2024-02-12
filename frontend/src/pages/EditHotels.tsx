import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { uesAppContext } from "../contexts/AppContext";

const EditHotel = () => {
    const { showToast } = uesAppContext();
    const { hotelId } = useParams();

    const { data: hotel } = useQuery(
        "fetchMyHotelById",
        () => apiClient.fetchMyHotelById(hotelId || ""),
        {
            enabled: !!hotelId,
        }
    );

    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
        onSuccess: () => {
            showToast({ message: "Hotel Saved", type: "SUCCESS" });
        },
        onError: () => {
            showToast({ message: "Error Saving hotel", type: "ERROR" });
        },
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };

    return (
        <ManageHotelForm
            hotel={hotel}
            onSave={handleSave}
            isLoading={isLoading}
        />
    );
};

export default EditHotel;