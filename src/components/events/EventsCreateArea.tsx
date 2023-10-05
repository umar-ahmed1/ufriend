"use client";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
  Image
} from "@chakra-ui/react";
import React, { forwardRef } from "react";
import { UserData } from "../userpage/UserHome";
import { RiPagesFill } from "react-icons/ri";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { AiFillFileImage } from "react-icons/ai";
import useSelectFile from "@/hooks/useSelectFile";
import { nanoid } from "nanoid";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"
import { doc, collection, serverTimestamp, Timestamp, setDoc, updateDoc } from "firebase/firestore";
import Message from "../messaging/Message";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";

type EventsCreateAreaProps = {
  user:User | null | undefined
};

export type EventAttendee = {
  userId: string;
  userPic: string;
  userName: string;
};

export type UserEvent = {
  id: string;
  title: string;
  date: Date;
  description: string;
  photoURL:string;
  creatorId?: string;
  attendees: EventAttendee[];
};

const EventsCreateArea: React.FC<EventsCreateAreaProps> = ({user}) => {
  const [eventDetails, setEventDetails] = React.useState<UserEvent>({
    id:nanoid(),
    title: "",
    date: new Date(),
    description: "",
    photoURL:"",
    creatorId: user?.uid,
    attendees: [],
  });

  const router = useRouter()
  const [selected, setSelected] = React.useState("Details");
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const selectedFileRef = React.useRef<HTMLInputElement>(null);
  const [loading,setLoading] = React.useState(false)

  const [startDate,setStartDate] = React.useState(null)

  const handleUploadFile = async () => {
    if (selectedFile) {
      const randomId = nanoid()
      const imageRef = ref(storage, `images/${randomId}`);
      //store in storage (not firestore but the storage) then we can just add the place it is in the storage to the post
      await uploadString(imageRef, selectedFile, "data_url"); //upload selectedFile in imageRef as type data_url
      //get the image url
      const downloadURL = await getDownloadURL(imageRef);

      setEventDetails((prev) => ({
        ...prev,
        photoURL: downloadURL
      }));
    }
    }

    const createEvent = async () => {
      if (eventDetails.title == "" || eventDetails.description == "") {
        return;
      }
      try{
        setLoading(true);
        //store the event
        const eventDocRef = doc(collection(firestore, "events"));
        const event: UserEvent = eventDetails as UserEvent
        await setDoc(eventDocRef, event);
        setLoading(false);
        router.push('/')
      }
      catch(error:any){
        console.log("create event error")
        console.log(error.message)
      }
    };

    const handleSubmit = () => {
      console.log(eventDetails.photoURL)
      handleUploadFile()
      createEvent()
    }

    React.useEffect(() => {
      console.log(eventDetails)
    },[eventDetails.photoURL])

  return (
    <>
      <Flex width="100%" direction="column" bgColor="gray.100" height="100vh">
        <Flex height="400px" width={{base:"100%",sm:"85%",md:"60%",lg:"50%",xl:"33%"}} direction="column" ml={{base:"0%",sm:"3%",md:"5%"}} p={{base:1,sm:3,md:5}}>
          <Text fontSize={30} color="brand.400">
            Create an Event
          </Text>
          <Divider borderColor="brand.100" />
          <Stack
            mt={5}
            spacing={5}
            height="300px"
            bgColor="white"
            border="1px solid"
            borderColor="brand.300"
          >
            <Flex width="100%">
              <Button
                width="34%"
                bgColor="white"
                border="1px solid"
                borderColor="gray.100"
                height="50px"
                borderRadius="0"
                fontWeight={selected == "Details" ? "700" : "400"}
                color="brand.400"
                borderBottomColor={
                  selected == "Details" ? "brand.400" : "gray.100"
                }
                onClick={() => setSelected("Details")}
              >
                <Icon as={RiPagesFill} mr={2}></Icon>
                <Text>Details</Text>
              </Button>
              <Button
                width="33%"
                bgColor="white"
                border="1px solid"
                borderColor="gray.100"
                height="50px"
                borderRadius="0"
                fontWeight={selected == "Image" ? "700" : "400"}
                color="brand.400"
                borderBottomColor={
                  selected == "Image" ? "brand.400" : "gray.100"
                }
                onClick={() => setSelected("Image")}
              >
                <Icon as={AiFillFileImage} mr={2}></Icon>
                <Text>Image</Text>
              </Button>
              <Button
                width="33%"
                bgColor="white"
                border="1px solid"
                borderColor="gray.100"
                borderRadius="0"
                textAlign="center"
                height="50px"
                fontWeight={selected == "Date & Time" ? "700" : "400"}
                color="brand.400"
                borderBottomColor={
                  selected == "Date & Time" ? "brand.400" : "gray.100"
                }
                onClick={() => setSelected("Date & Time")}
              >
                <Icon as={BsFillCalendarDateFill} mr={2}></Icon>
                <Text display={{base:"flex",sm:"none"}}>Date</Text>
                <Text display={{base:"none",sm:"flex"}}>Date & Time</Text>
              </Button>
            </Flex>
            {selected == "Details" && (
              <>
                <Input
                  ml={5}
                  type="text"
                  width="90%"
                  placeholder="Title"
                  value={eventDetails.title}
                  onChange={(event) =>
                    setEventDetails((prev) => ({
                      ...prev,
                      title: event.target.value,
                    }))
                  }
                ></Input>
                <Textarea
                  ml={5}
                  width="90%"
                  placeholder="Description"
                  resize={"none"}
                  value={eventDetails.description}
                  onChange={(event) =>
                    setEventDetails((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                />
              </>
            )}
            {selected == "Date & Time" && (
              <>
              <DatePicker
                selected={eventDetails.date}
                showTimeSelect
                onChange={(date) =>
                  setEventDetails((prev) => ({
                    ...prev,
                    date: date!,
                  }))
                } 
                wrapperClassName="datePicker"
                placeholderText="Select a Date and Time"
                dateFormat="MMMM d, yyyy h:mm aa"
              >
              </DatePicker>
              {/* <Textarea
                ml={5}
                width="90%"
                placeholder="Time"
                resize={"none"}
                value={eventDetails.time}
                onChange={(event) =>
                  setEventDetails((prev) => ({
                    ...prev,
                    time: event.target.value,
                  }))
                }
              /> */}
            </>
            )}
            {selected == "Image" && (
              <>
              <Flex direction="column" justify="center" align="center" width="100%">
                {selectedFile ? (
                  <>
                    <Image
                      src={selectedFile}
                      maxWidth="300px"
                      maxHeight="100px"
                    ></Image>
                    <Stack direction="row" spacing={2} mt={4}>
                      <Button
                        variant="outline"
                        height="28px"
                        border="1px solid grey"
                        onClick={() => setSelectedFile("")}
                      >
                        {" "}
                        Remove
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <Flex
                    justify="center"
                    align="center"
                    height='140px'
                    border="1px dashed"
                    borderColor="brand.100"
                    width="100%"
                    borderRadius={4}
                  >
                    <Button
                      variant="outline"
                      height="28px"
                      border="1px solid grey"
                      onClick={() => selectedFileRef.current?.click()}
                    >
                      Upload
                    </Button>
                    <input
                      ref={selectedFileRef}
                      type="file"
                      hidden
                      onChange={onSelectFile}
                    />
                  </Flex>
                )}
              </Flex>
            </>
            )}

            <Flex width="100%" align="center" justify="flex-end" pr={10}>
              <Button
                bgColor="brand.400"
                color="white"
                _hover={{ bgColor: "brand.100", color: "brand.400" }}
                onClick={handleSubmit}
                isLoading={loading}
              >
                Create Event
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
export default EventsCreateArea;
