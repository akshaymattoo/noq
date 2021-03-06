import {useState} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import {Flex,Heading,Input,Button,InputGroup,useColorModeValue,
  InputLeftElement,Stack,
  NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper} from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react"
import { Link,Box } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { PhoneIcon} from '@chakra-ui/icons';
import Header from '../../components/Header';
import styles from '../../styles/Home.module.css'

export default function Home() {
  const router = useRouter();
  const toast = useToast();
  const formBg = useColorModeValue("gray.100","gray.700")
  const [num,setNum] = useState("")
  const [name,setName] = useState("")
  const [waitingTime,setWaitingTime] = useState(0)
  const qrCode = async () => {
      //SetCode()
      // here I will make a DB call to save info in mongo
      /*let server = "http://localhost:3000"
      if(process.env.NODE_ENV !== 'production'){
          server = "https://n0q.herokuapp.com"
      }
      server = "https://n0q.herokuapp.com"*/
      const obj ={
        method: 'post',
        url: `https://n0q.herokuapp.com/api/qrcodes`,
        data: {name:name,number:num,waitingTime:waitingTime}
      }
      console.log(obj)
      const {data} = await axios({
        method: 'post',
        url: `https://n0q.herokuapp.com/api/qrcodes`,
        data: {name:name,number:num,waitingTime:waitingTime}
      });
      //console.log(JSON.stringify(data,null,2));
      toast({
        description: "You have a waiting time of "+waitingTime,
        render: () => (
          <Box color="white" p={3} bg="blue.500">
            <Link href={`https://noq-orcin.vercel.app/qrcode/${data.data.code}`} isExternal>
            Click here for your code.<ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
        ),
        status: "success",
        duration: 50000,
        position:'bottom-right',
        isClosable: true,
      })
      router.push('/');
  }
  return (
    <div className={styles.container}>
    <Header />
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Flex direction="column" background={formBg} p={12} rounded={6}>
        <Heading mb={6}>Enter Information</Heading>
        <Stack spacing={4} mb={6}>
        <InputGroup>
                <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                />
                <Input placeholder="Enter name" value={name} onChange={(e) => { setName(e.target.value)}}/>
            </InputGroup>

            <InputGroup>
                <InputLeftElement
                pointerEvents="none"
                children={<PhoneIcon color="gray.300" />}
                />
                <Input type="tel" placeholder="Phone number" value={num} onChange={(e) => { setNum(e.target.value)}}/>
            </InputGroup>

            
            <InputGroup>
              <NumberInput defaultValue={10} min={10} max={20} onChange={(e) => { setWaitingTime(parseInt(e))}}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
            </Stack>
        <Button colorScheme="teal" onClick={qrCode}>Get QR Code</Button>
        
      </Flex>
    </Flex>
    </div>
   )
}
