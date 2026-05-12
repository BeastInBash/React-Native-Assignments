import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

export default function CustomSplash() {

    return (
        <LinearGradient
            colors={['#0f1117', '#151925', '#1b2233']}
            style={styles.container}
        >

            {/* Logo */}
            <View style={styles.logoBox}>
                <Text style={styles.logo}>{'< >'}</Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>Welcome To Notely.</Text>

            <Text style={styles.subtitle}>
                Your personal diary.
            </Text>

            {/* Bottom */}
            {/* <View style={styles.bottomContainer}> */}
            {/**/}
            {/*     <View style={styles.progressBar}> */}
            {/*         <View style={styles.progress} /> */}
            {/*     </View> */}

            {/* <View style={styles.footerRow}> */}
            {/*     <Text style={styles.footerLeft}> */}
            {/*         LOADING_MODULES */}
            {/*     </Text> */}
            {/**/}
            {/*     <Text style={styles.footerRight}> */}
            {/*         v.4.0-STABLE */}
            {/*     </Text> */}
            {/* </View> */}

            {/* </View> */}

        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 100,
        backgroundColor: '#0f1117',
    },

    logoBox: {
        marginTop: 50,

        width: 90,
        height: 90,

        borderRadius: 28,

        backgroundColor: '#151925',

        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#61afef',
        shadowOpacity: 0.4,
        shadowRadius: 20,
    },

    logo: {
        color: '#61afef',
        fontSize: 34,
        fontWeight: '700',
    },

    title: {
        color: 'white',
        fontSize: 36,
        fontWeight: '700',
        marginTop: -180,
    },

    subtitle: {
        color: '#8b93a7',
        letterSpacing: 4,
        fontSize: 12,
        marginTop: -150,
    },

    bottomContainer: {
        width: '80%',
    },

    progressBar: {
        height: 4,
        backgroundColor: '#2a2f3a',
        borderRadius: 999,
        overflow: 'hidden',
        marginBottom: 14,
    },

    progress: {
        width: '70%',
        height: '100%',
        backgroundColor: '#c678dd',
    },

    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    footerLeft: {
        color: '#7d8597',
        fontSize: 11,
        letterSpacing: 2,
    },

    footerRight: {
        color: '#7d8597',
        fontSize: 11,
    },
})
