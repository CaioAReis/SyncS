import { SectionList, View } from "react-native";
import { Text, TimelineCard } from "../../components";
import { useAppTheme } from "../../theme";

export interface TimelineItem {
  _id: string,
  year: number,
  data: TimelinePeriod[],
}

export interface TimelinePeriod {
  _id: string,
  body: string,
  title: string,
  galery?: string[],
  when: { day: number, month: string },
}

const DATA: TimelineItem[] = [

  {
    _id: "1",
    year: 2020,
    data: [
      {
        _id: "1",
        galery: [],
        when: { day: 1, month: "Agosto" },
        title: "1º Semana Acadêmica IFS - Campus Lagarto",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum.",
      },

      {
        _id: "2",
        galery: [],
        when: { day: 1, month: "Agosto" },
        title: "2º Semana Acadêmica IFS - Campus Lagarto",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum.",
      },

      {
        _id: "3",
        galery: [],
        when: { day: 1, month: "Agosto" },
        title: "3º Semana Acadêmica IFS - Campus Lagarto",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum.",
      },
    ]
  },

  {
    _id: "1",
    year: 2021,
    data: [
      {
        _id: "1",
        galery: [],
        when: { day: 1, month: "Agosto" },
        title: "1º Semana Acadêmica IFS - Campus Lagarto",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum.",
      },

      {
        _id: "2",
        galery: [],
        when: { day: 1, month: "Agosto" },
        title: "2º Semana Acadêmica IFS - Campus Lagarto",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum.",
      },

      {
        _id: "3",
        galery: [],
        when: { day: 1, month: "Agosto" },
        title: "3º Semana Acadêmica IFS - Campus Lagarto",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum.",
      },
    ]
  },

  {
    _id: "1",
    year: 2022,
    data: [
      {
        _id: "1",
        galery: [],
        when: { day: 1, month: "Agosto" },
        title: "1º Semana Acadêmica IFS - Campus Lagarto",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum.",
      },

      {
        _id: "2",
        galery: [],
        when: { day: 1, month: "Agosto" },
        title: "2º Semana Acadêmica IFS - Campus Lagarto",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum.",
      },
    ]
  },

];

export default function Timeline() {
  const { colors } = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>

      <SectionList
        sections={DATA}
        keyExtractor={item => item?._id}
        ListHeaderComponent={
          <View style={{ marginVertical: 20 }}>
            <Text fw="BOLD" ta="center">TIMELINE IFS</Text>
          </View>
        }

        //  Title timeline
        renderSectionHeader={({ section }) => (
          <Text
            fs={28}
            fw="BOLD"
            style={{ marginHorizontal: 20, marginVertical: 10 }}
          >
            {section?.year}
          </Text>
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