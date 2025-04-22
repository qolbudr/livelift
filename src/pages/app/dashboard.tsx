import { AdminLayout } from "@/components/layout/admin_layout";
import { Card, CardContent } from "@/components/ui/card";
import { JSX, useEffect, useState } from "react";
import * as Icon from 'react-bootstrap-icons';
import Head from "next/head";
import { MediaRepository } from "@/core/repository/media_repository";
import { toast } from "sonner";
import { handleError } from "@/core/utils/handle_error";
import { LiveRepository } from "@/core/repository/live_repository";
import { HistoryRepository } from "@/core/repository/history_repository";

const Dashboard = (): JSX.Element => {
  const [countVideo, setCountVideo] = useState(0);
  const [countLive, setCountLive] = useState(0);
  const [countHistory, setHistory] = useState(0);

  const getVideoCount = async () => {
    try {
      const response = await MediaRepository.getMedia();
      setCountVideo(response?.count ?? 0);
    } catch (e) {
      toast.error(handleError(e));
    }
  }

  const getHistoryCount = async () => {
    try {
      const response = await HistoryRepository.getHistory();
      setHistory(response?.count ?? 0);
    } catch (e) {
      toast.error(handleError(e));
    }
  }

  const getLiveCount = async () => {
    try {
      const response = await LiveRepository.getLive();
      setCountLive(response?.count ?? 0);
    } catch (e) {
      toast.error(handleError(e));
    }
  }

  useEffect(() => {
    getVideoCount();
    getLiveCount();
    getHistoryCount();
  }, [])

  return <>
      <Head>
        <title>Livelift - Dashboard</title>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card className="col-span-1 lg:col-span-3">
          <CardContent>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome to your dashboard!</p>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="card-text">
                <h1 className="text-xl font-bold">{countVideo} Video</h1>
                <p className="text-gray-600">Your total uploaded video</p>
              </div>
              <div className="flex justify-center items-center card-icon rounded-sm border shadow-shadow w-10 h-10 bg-main">
                <Icon.CameraVideo />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="card-text">
                <h1 className="text-xl font-bold">{countLive} Stream</h1>
                <p className="text-gray-600">Your total stream</p>
              </div>
              <div className="flex justify-center items-center card-icon rounded-sm border shadow-shadow w-10 h-10 bg-main">
                <Icon.Record2 className="size-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="card-text">
                <h1 className="text-xl font-bold">{countHistory} Live</h1>
                <p className="text-gray-600">Your total live started</p>
              </div>
              <div className="flex justify-center items-center card-icon rounded-sm border shadow-shadow w-10 h-10 bg-main">
                <Icon.Clock />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  </>
}

export default Dashboard;