import { CheckIcon, CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  useClipboard,
} from "@chakra-ui/react"
import { useState } from "react"

interface AccessData {
  access_token: string
  expires_at: number
}

export default function TokenInput({
  onSubmit,
}: {
  onSubmit?: (data: AccessData) => void
}) {
  const { onCopy, hasCopied } = useClipboard(
    "JSON.parse(Object.values(localStorage)[2])"
  )
  const [hasToken, setHasToken] = useState(false)
  const [accessData, setAccessData] = useState<AccessData | null>(null)

  return (
    <Accordion allowToggle borderColor={hasToken ? undefined : "tomato"}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Set Access Token
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Flex>
            <Input
              flex="1"
              placeholder="Access token"
              variant="filled"
              onChange={(e) => {
                setHasToken(e.target.value !== "")
                // Check if the input is a valid JSON
                try {
                  const json = JSON.parse(e.target.value)
                  setAccessData(json)
                } catch (e) {
                  setAccessData(null)
                }
              }}
              borderColor={hasToken ? undefined : "tomato"}
            />
            <Button
              colorScheme="green"
              ml={2}
              onClick={() => {
                if (accessData) {
                  onSubmit?.(accessData)
                }
              }}
            >
              Submit
            </Button>
          </Flex>
        </AccordionPanel>
        <AccordionPanel pb={4}>
          <HStack>
            <InputGroup variant="outline">
              <Input
                isReadOnly
                value="JSON.parse(Object.values(localStorage)[2])"
              />
              <InputRightElement>
                <Button onClick={onCopy}>
                  {hasCopied ? <CheckIcon /> : <CopyIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button
              as={Link}
              href="https://bolig.sit.no/no/auth/profile"
              isExternal
            >
              SIT <ExternalLinkIcon ml={2} />
            </Button>
          </HStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export type { AccessData }
