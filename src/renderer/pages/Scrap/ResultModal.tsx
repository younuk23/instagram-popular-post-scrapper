import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Badge,
} from '@chakra-ui/react';
import {
  ScrapFailResult,
  ScrapResult,
  ScrapSuccessResult,
} from 'main/scrapper/scrapperManager';
import { invokeWithCustomErrors } from 'renderer/utils';

interface Props {
  scrapResult: ScrapResult[] | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ResultModal({ scrapResult, isOpen, onClose }: Props) {
  const openScreenshotDirectory = () => {
    invokeWithCustomErrors(() => window.api.OPEN_SCREENSHOT_DIRECTORY());
  };

  const openScreenshot = (path: string) => {
    invokeWithCustomErrors(() => window.api.OPEN_FILE(path));
  };

  const openPost = (path: string) => {
    invokeWithCustomErrors(() => window.api.OPEN_URL(path));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent width="80vw">
          <ModalHeader>스크랩 결과</ModalHeader>
          <ModalCloseButton />
          <ModalBody width="80vw">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>키워드</Th>
                    <Th>포스트 URL</Th>
                    <Th>인기 게시물 등록 여부</Th>
                    <Th>스크린샷 경로</Th>
                    <Th>비고</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {scrapResult?.map((result, index) => {
                    const { keyword, postURL } = result;
                    return (
                      <Tr key={index}>
                        <Td>{keyword}</Td>
                        <Td>
                          <Button
                            variant="link"
                            onClick={() => openPost(postURL)}
                          >
                            {postURL}
                          </Button>
                        </Td>
                        <Td>
                          <Badge
                            colorScheme={
                              isSuccessResult(result) ? 'green' : 'red'
                            }
                            fontSize="14px"
                          >
                            {isSuccessResult(result) ? '등록' : '미등록'}
                          </Badge>
                        </Td>
                        <Td>
                          {isSuccessResult(result) && (
                            <Button
                              variant="link"
                              onClick={() => openScreenshot(result.screenshot)}
                            >
                              {result.screenshot}
                            </Button>
                          )}
                        </Td>
                        <Td>{isFailResult(result) && result.reason}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button onClick={openScreenshotDirectory}>
              스크린샷 폴더 열기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const isSuccessResult = (result: ScrapResult): result is ScrapSuccessResult =>
  result.status === 'success';
const isFailResult = (result: ScrapResult): result is ScrapFailResult =>
  result.status === 'fail';
