import React from 'react';
import { Image, ScrollView, View } from 'react-native';

import Layout from '@components/Layout';
import { Utils, TextView, Row, Col, Card, Badge } from '@components';
import { colorGrayShade3 } from '@colors';
import MilkBottle from '@images/milk-bottle.png';
import FriedRice from '@images/fried-rice.png';
import Honey from '@images/honey.png';
import Discount from '@images/discount.png';
import styled from 'styled-components';

const CategoryIcon = styled(Image)`
  width: 40px;
  height: 40px;
`;

const Home = () => {
  return (
    <Layout>
      <ScrollView contentContainerStyle={Utils.flexGrow(1)}>
        <View style={{ ...Utils.flex(1), ...Utils.p(16) }}>
          <Card>
            <TextView
              color={colorGrayShade3}
              fontWeight="bold"
              style={Utils.mb(16)}>
              Thank you for signing up!
            </TextView>
            <TextView color={colorGrayShade3} style={Utils.mb(8)}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </TextView>
            <TextView color={colorGrayShade3} style={Utils.mb(16)}>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </TextView>
            <Row>
              <Badge>
                <TextView style={Utils.px(8)} color={colorGrayShade3}>
                  040-123-4567
                </TextView>
              </Badge>
            </Row>
          </Card>
          <Row
            justifyContent="space-between"
            alignItems="center"
            style={Utils.my(16)}>
            <TextView
              color={colorGrayShade3}
              textTransform="uppercase"
              fontWeight="bold">
              Browse Categories
            </TextView>
            <TextView
              color={colorGrayShade3}
              textTransform="uppercase"
              fontSize={13}>
              View All
            </TextView>
          </Row>
          <Row justifyContent="space-around">
            <Col alignItems="center">
              <Card borderRadius={16}>
                <CategoryIcon source={MilkBottle} />
              </Card>
              <TextView>Milk</TextView>
            </Col>
            <Col alignItems="center">
              <Card borderRadius={16}>
                <CategoryIcon source={FriedRice} />
              </Card>
              <TextView>Curd &amp; Paneer</TextView>
            </Col>
            <Col alignItems="center">
              <Card borderRadius={16}>
                <CategoryIcon source={Honey} />
              </Card>
              <TextView>Ghee</TextView>
            </Col>
            <Col alignItems="center">
              <Card borderRadius={16}>
                <CategoryIcon source={Discount} />
              </Card>
              <TextView>Offers</TextView>
            </Col>
          </Row>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Home;
