import { useContext, useLayoutEffect, useState } from "react";
import { Image, SectionList, View, useWindowDimensions } from "react-native";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import { useAppTheme } from "../../theme";
import { TimelineItem } from "../../types";
import { db } from "../../services/firebaseConfig";
import AppContext from "../../services/AppContext";
import { Text, TimelineCard } from "../../components";

export default function Timeline() {
  const { colors } = useAppTheme();
  const { setIsLoading } = useContext(AppContext);
  // const [lastPeiod, setLastPeriod] = useState();
  const { width, height } = useWindowDimensions();
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  const getTimeline = async () => {
    setIsLoading(true);
    const firstPage = query(collection(db, "timeline"), orderBy("year", "desc"), limit(2));
    await getDocs(firstPage).then(result => {
      setTimeline(result.docs.map(doc => doc.data() as TimelineItem));
      // setLastPeriod(result.docs[result.docs.length - 1]);
    }).finally(() => setIsLoading(false));
  };

  // const getNextTimeline = async () => {
  //   const nextPage = query(collection(db, "timeline"), orderBy("year", "desc"), startAfter(lastVisible), limit(2));
  //   await getDocs(nextPage).then(result => {
  //     setTimeline(result.docs.map(doc => doc.data() as TimelineItem));
  //     setLastPeriod(result.docs[result.docs.length - 1]);
  //   });
  // };

  useLayoutEffect(() => {
    getTimeline();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SectionList
        sections={timeline}
        keyExtractor={item => item?._id}
        ListEmptyComponent={
          <View style={{ alignItems: "center", height: height - 150, justifyContent: "center" }}>
            <Image
              style={{ width: width / 1.5, height: width / 1.5 }}
              source={require("../../../assets/images/Request.png")}
            />
            <Text ta="center" fs={16}>
              {"No momento não exitem atualizações \nem nossa timeline, volte mais tarde."}
            </Text>
          </View>
        }

        //  Title timeline
        renderSectionHeader={({ section }) => (
          <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.background }}>
            <Text fs={28} fw="BOLD" style={{ marginHorizontal: 20, marginVertical: 10 }}>
              {section?.year}
            </Text>

            <View style={{ height: 1, flex: 1, backgroundColor: colors.background7 }} />
          </View>
        )}

        //  Card Timeline
        renderItem={({ item, section, index }) => (
          <TimelineCard
            timelinePeriod={item}
            isLast={section?.data?.length - 1 === index}
          />
        )}

        ListFooterComponent={<View style={{ marginVertical: 30 }} />}
      />
    </View>
  );
}