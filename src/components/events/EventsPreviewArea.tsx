import { firestore } from "@/firebase/clientApp";
import { Button, Divider, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { collection, getDocs, query } from "@firebase/firestore";
import { orderBy, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React from "react";
import EventPreviewItem from "./EventPreviewItem";
import { UserEvent } from "./EventsCreateArea";

type EventsPreviewAreaProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const EventsPreviewArea: React.FC<EventsPreviewAreaProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const [events, setEvents] = React.useState<UserEvent[]>([]);
  const router = useRouter();

  const getEvents = async () => {
    const querySnapshot = query(
      collection(firestore, "events"),
      orderBy("date")
    );
    const queryData = await getDocs(querySnapshot);
    const temp: UserEvent[] = [];
    queryData.forEach((doc) => {
      const eventData = doc.data();
      // Convert the Firestore Timestamp to JavaScript Date
      eventData.date = eventData.date.toDate();
      temp.push(eventData as UserEvent);
    });

    setEvents(temp);
  };

  React.useEffect(() => {
    getEvents();
  }, []);

  React.useEffect(() => {
    console.log(events)
  },[events])

  return (
    <Flex
      width="100%"
      borderLeft="1px solid"
      borderColor="gray.200"
      height="100%"
      direction="column"
      pl={{ base: 2, md: 4 }}
      pr={{ base: 2, md: 4 }}
    >
      <Flex
        width="100%"
        justify="space-between"
        align="center"
        mt={{ base: 2, md: 4 }}
      >
        <Text
          color="brand.400"
          fontWeight={700}
          fontSize={{ base: "20px", sm: "25px", md: "30px" }}
        >
          Events
        </Text>
        <Flex align="center" width="60%">
          <Input placeholder="Search Events" maxWidth="75%"></Input>
          <Input maxWidth="25%" placeholder="Date"></Input>
        </Flex>
        <Button
          color="white"
          backgroundColor="brand.400"
          _hover={{ opacity: 0.9 }}
          onClick={() => router.push("/create")}
        >
          Create Event
        </Button>
      </Flex>
      <Stack mt={{ base: 2, sm: 4, md: 6 }}>
        <Text fontSize={25}>Today * August 10th </Text>
        <Divider borderColor="brand.400" mt={1} mb={1} />
        {events.map((event) => {
          return (
            <EventPreviewItem
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              title={event.title}
              description={event.description}
              date={event.date!}
              photoURL={event.photoURL}
            />
          );
        })}
      </Stack>
      <Stack mt={{ base: 2, sm: 4, md: 6 }}>
        <Text fontSize={25}>Tomorrow * August 11th</Text>
        <Divider borderColor="brand.400" mt={1} mb={1} />
        {events.map((event) => {
          return (
            <EventPreviewItem
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              title={event.title}
              description={event.description}
              date={event.date!}
              photoURL={event.photoURL}
            />
          );
        })}
      </Stack>
    </Flex>
  );
};
export default EventsPreviewArea;
