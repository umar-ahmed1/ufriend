import { storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import {
  Flex,
  Input,
  Stack,
  Select,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { nanoid } from "nanoid";
import React from "react";
import { UserDetails } from "./CreateAccount";

type Step3Props = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  signUpForm: UserDetails;
  setSignUpForm: React.Dispatch<React.SetStateAction<UserDetails>>;
};

const Step3: React.FC<Step3Props> = ({
  step,
  setStep,
  signUpForm,
  setSignUpForm
}) => {

  const [error, setError] = React.useState("");
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const selectedFileRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setError("");
    handleUploadFile();
    setStep(step + 1);
  };

  const handleUploadFile = async () => {
    if (selectedFile) {
      const randomId = nanoid()
      const imageRef = ref(storage, `images/${randomId}`);
      //store in storage (not firestore but the storage) then we can just add the place it is in the storage to the post
      await uploadString(imageRef, selectedFile, "data_url"); //upload selectedFile in imageRef as type data_url
      //get the image url
      const downloadURL = await getDownloadURL(imageRef);

      setSignUpForm((prev) => ({
        ...prev,
        photoURL: downloadURL
      }));
    }
    }

    return (
      <>
        <Text fontSize="31px" color="brand.100" fontWeight={600} mt={2} mb={3}>
          {"Select a profile picture"}
        </Text>
        <Flex direction="column" justify="center" align="center" width="100%">
          {selectedFile ? (
            <>
              <Image
                src={selectedFile}
                maxWidth="400px"
                maxHeight="400px"
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
              p={20}
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
          <Button
            mt={4}
            width="100%"
            bg="white"
            mb={4}
            backgroundColor="brand.100"
            borderRadius="full"
            onClick={handleSubmit}
          >
            <Text mr={4}>Next</Text>
          </Button>
        </Flex>
      </>
    );
  };
export default Step3;
