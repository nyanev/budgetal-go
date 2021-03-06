import React from 'react';
import { View, Text } from 'react-native';
import { currencyf } from 'utils/helpers';

const ProgressLabel = ({ spent, remaining }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ flex: 1, fontWeight: '700', textAlign: 'left' }}>
          Spent
        </Text>
        <Text style={{ flex: 1, fontWeight: '700', textAlign: 'right' }}>
          Remaining
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ flex: 1, fontWeight: '700', textAlign: 'left' }}>
          {currencyf(spent)}
        </Text>
        <Text style={{ flex: 1, fontWeight: '700', textAlign: 'right' }}>
          {currencyf(remaining)}
        </Text>
      </View>
    </View>
  );
};

export default ProgressLabel;
