import { useContext, useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks"
import { Navigate, useParams} from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
export default function PlacesFormPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const {id} = useParams() // if redirect to this page it was through clicking on id so we can use useParams hook
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  
  useEffect(() => {
    if (!id){
      return
    }
    axios.get('/places/'+id).then(response => {
      const {data} = response;
      setTitle(data.title)
      setAddress(data.address)
      setAddedPhotos(data.photos)
      setDescription(data.description)
      setPerks(data.perks)
      setExtraInfo(data.extraInfo)
      setCheckIn(data.checkIn)
      setCheckOut(data.checkOut)
      setMaxGuests(data.maxGuests)
    });
  }, [id])

  function inputDesc(para) {
    return <p className="text-gray-500 text-sm">{para}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDesc(description)}
      </>
    );
  }

  async function addNewPlace(ev) {
    ev.preventDefault();
    const dataSubmit = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    if(id){
      
      const data = await axios.put("/places", {id, ...dataSubmit});
      setRedirect(true)
    }
    
    const data = await axios.post("/places", dataSubmit);
    setRedirect(true)
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  if (redirect){
    return <Navigate to={'/account/places'}/>
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput("Title", "The title of the place you are renting")}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        {preInput("Address", "The address of the place you are renting")}
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />
        {preInput("Photos", "Pictures that define the place you are renting")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Describe the place you are renting")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks", "Select the perks that apply")}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra Info", "House rules, What should they know?, etc")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput("Check in, Check out, Max guests", "Some additional info")}
        <div className="grid sm:grid-cols-3 gap-2">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max guests</h3>
            <input
              type="text"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
        </div>
        <button className="primary mt-4">Save</button>
      </form>
    </div>
  );
}
