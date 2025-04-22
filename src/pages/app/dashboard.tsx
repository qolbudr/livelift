import { AdminLayout } from "@/components/layout/admin_layout";
import { Card, CardContent } from "@/components/ui/card";
import { JSX } from "react";
import * as Icon from 'react-bootstrap-icons';
import Head from "next/head";

const Dashboard = (): JSX.Element => {
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
                <h1 className="text-xl font-bold">10 Video</h1>
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
                <h1 className="text-xl font-bold">10 Stream</h1>
                <p className="text-gray-600">Your total live stream</p>
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
                <h1 className="text-xl font-bold">10 Minutes</h1>
                <p className="text-gray-600">Your total minutes stream</p>
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