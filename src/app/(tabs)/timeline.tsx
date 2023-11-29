import { SectionList, View } from "react-native";

import { useAppTheme } from "../../theme";
import { Text, TimelineCard } from "../../components";

export interface TimelineItem {
  _id: string,
  year: number,
  data: TimelinePeriod[],
}

export interface ImageGalleryProp {
  image: string,
  [key: string]: string,
}

export interface TimelinePeriod {
  _id: string,
  body: string,
  title: string,
  gallery?: ImageGalleryProp[],
  when: { day: number, month: string },
}

const DATA: TimelineItem[] = [

  {
    _id: "1",
    year: 2020,
    data: [
      {
        _id: "1",
        gallery: [
          { code: "001", image: "https://humulos.com/digimon/images/art/metalgaruru.jpg" },
          { code: "002", image: "https://humulos.com/digimon/images/art/metalgrey_am.jpg" },
          { code: "003", image: "https://humulos.com/digimon/images/art/weregaruru_s.jpg" },
        ],
        when: { day: 1, month: "Agosto" },
        title: "1º Semana Acadêmica IFS - Campus Lagarto",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum.",
      },

      {
        _id: "2",
        gallery: [
          { code: "004", image: "https://humulos.com/digimon/images/art/chaosdra.jpg" },
          { code: "005", image: "https://humulos.com/digimon/images/art/ryuda.jpg" },
          { code: "006", image: "https://humulos.com/digimon/images/art/ouryu.jpg" },
          { code: "007", image: "https://humulos.com/digimon/images/art/duke_x.jpg" },
          { code: "008", image: "https://humulos.com/digimon/images/art/galgo.jpg" },
          { code: "009", image: "https://humulos.com/digimon/images/art/cherubi_vice.jpg" },
          { code: "010", image: "https://humulos.com/digimon/images/art/tao.jpg" },
          { code: "011", image: "https://humulos.com/digimon/images/art/kaisergrey.jpg" },
        ],
        when: { day: 1, month: "Agosto" },
        title: "2º Semana Acadêmica IFS - Campus Lagarto",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum.",
      },

      {
        _id: "3",
        gallery: [],
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
        gallery: [],
        when: { day: 1, month: "Agosto" },
        title: "1º Semana Acadêmica IFS - Campus Lagarto",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum.",
      },

      {
        _id: "2",
        gallery: [],
        when: { day: 1, month: "Agosto" },
        title: "2º Semana Acadêmica IFS - Campus Lagarto",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum.",
      },

      {
        _id: "3",
        gallery: [],
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
        gallery: [],
        when: { day: 1, month: "Agosto" },
        title: "1º Semana Acadêmica IFS - Campus Lagarto",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante eros. Maecenas efficitur arcu pulvinar dui accumsan condimentum.",
      },

      {
        _id: "2",
        gallery: [],
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
          <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.background }}>
            <Text
              fs={28}
              fw="BOLD"
              style={{ marginHorizontal: 20, marginVertical: 10 }}
            >
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