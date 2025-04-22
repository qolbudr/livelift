import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HistoryRepository } from "@/core/repository/history_repository";
import { History } from "@/core/types/history";
import { handleError } from "@/core/utils/handle_error";
import { JSX, use, useEffect, useState } from "react";
import { toast } from "sonner";
import tz from '@/core/utils/timezone';
import moment from "moment-timezone";
import Head from "next/head";

const HistoryPage = (): JSX.Element => {
  const [history, setHistory] = useState<History[]>([])

  const getHistory = async () => {
    try {
      const response = await HistoryRepository.getHistory();
      setHistory(response!.data);
    } catch (e) {
      toast.error(handleError(e));
    }
  }

  useEffect(() => { getHistory() }, [])

  return <>
    <Head>
      <title>Livelift - History</title>
    </Head>
    <Table>
      <TableCaption className="text-foreground">
        History live stream yo've started
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Judul</TableHead>
          <TableHead>Stream Key</TableHead>
          <TableHead>RTMP URL</TableHead>
          <TableHead>Started At</TableHead>
          <TableHead>Ended At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-base">{item.live.title}</TableCell>
            <TableCell>{item.live.streamKey}</TableCell>
            <TableCell>{item.live.rtmpUrl}</TableCell>
            <TableCell>{moment(item.createdAt).utc().local().format('DD MMMM yyyy HH:mm:ss')}</TableCell>
            <TableCell>{moment(item.updatedAt).utc().local().format('DD MMMM yyyy HH:mm:ss')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
}

export default HistoryPage;