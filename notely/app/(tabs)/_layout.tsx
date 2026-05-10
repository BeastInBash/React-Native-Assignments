import { Tabs } from 'expo-router';
import React from 'react';

import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'


export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                sceneStyle: {
                    backgroundColor: "rgba(255,255,255,0.15)",
                },
                tabBarStyle: {
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    marginHorizontal: 20,
                    // paddingVertical: 40,
                    paddingTop: 8,
                    paddingBottom: 8,
                    right: 20,
                    height: 70,
                    borderRadius: 24,
                    borderTopWidth: 0,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    elevation: 0,
                    overflow: "hidden",
                },
                headerShown: false,
                tabBarBackground: () => (
                    <BlurView
                        tint="dark"
                        intensity={20}
                        style={{
                            flex: 1,
                        }}
                    />
                ),
                tabBarActiveTintColor: "#C678DD",
                tabBarInactiveTintColor: "#74777C",
                tabBarHideOnKeyboard: true,
            }}>
            <Tabs.Screen
                name="Home"
                options={{
                    title: 'home',
                    tabBarIcon: ({ color }) => <Ionicons size={18} name="person-add" color={color} />,
                }}

            />

            <Tabs.Screen
                name="Notes"
                options={{
                    title: 'notes',
                    tabBarIcon: ({ color }) => <Ionicons size={18} name="newspaper" color={color} />,
                }}

            />
        </Tabs>
    );
}
