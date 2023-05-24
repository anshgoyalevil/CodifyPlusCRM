import { Grid, Container, Text, Paper, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { AllServicesListFragment } from "../Fragments/AllServicesFragments/AllServicesListFragment";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AllServices() {
  const [Stats, setStats] = useState({
    completedServices: [
      {
        name: "",
        icon: "",
        status: "",
        serviceId: "",
      },
    ],
    pendingServices: [],
    processServices: [
      {
        name: "",
        icon: "",
        status: "",
        serviceId: "",
      },
    ],
  });

  useEffect(() => {
    UserService.getUserStats().then(
      (response) => {
        //setStats(response.data);
        let completedServicesData = [];
        let underProcessServicesData = [];
        for (var i = 0; i < response.data.completedServices.length; i++) {
          completedServicesData.push({
            name: response.data.completedServices[i].name,
            icon: "C",
            status: "Completed",
            serviceId: response.data.completedServices[i].serviceId.toString(),
          });
        }

        for (var j = 0; j < response.data.processServices.length; j++) {
          underProcessServicesData.push({
            name: response.data.processServices[j].name,
            icon: "P",
            status: "Under Process",
            serviceId: response.data.processServices[j].serviceId.toString(),
          });
        }
        setStats({
          ...response.data,
          completedServices: completedServicesData,
          processServices: underProcessServicesData,
        });
      },
      (error) => {
        const _Stats =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setStats(_Stats);

        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user: currentUser } = useSelector((state: any) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Container my="md">
      <Title
        align="center"
        sx={(theme) => ({
          fontWeight: 900,
        })}
      >
        All Services
      </Title>
      <Grid mt={30}>
        <Grid.Col xs={12}>
          <Paper shadow="md" p={20} withBorder>
            <Text mb={10} ml={10}>
              Under Process Services:
            </Text>
            <AllServicesListFragment data={Stats.processServices} />
          </Paper>
        </Grid.Col>
        <Grid.Col xs={12}>
          <Paper shadow="md" p={20} withBorder>
            <Text mb={10} ml={10}>
              Completed Services:
            </Text>
            <AllServicesListFragment data={Stats.completedServices} />
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
