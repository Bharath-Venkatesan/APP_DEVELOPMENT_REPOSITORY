import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

const iconLinks = {
    health: 'https://www.hdfcergo.com/images/default-source/home-revamp/buy/mb-buy/health_mb.svg',
    pet: 'https://www.hdfcergo.com/images/default-source/home-revamp/desktoppet.gif',
    car: 'https://www.hdfcergo.com/images/default-source/home-revamp/buy/mb-buy/car_mb.svg',
    travel: 'https://www.hdfcergo.com/images/default-source/home-revamp/buy/mb-buy/travel_mb.svg',
    bike: 'https://www.hdfcergo.com/images/default-source/home-revamp/buy/mb-buy/bike_mb.svg',
    home: 'https://www.hdfcergo.com/images/default-source/home-revamp/buy/mb-buy/home_mb.svg',
};

const iconLabels = {
    health: 'Health Insurance',
    pet: 'Pet Insurance',
    car: 'Car Insurance',
    travel: 'Travel Insurance',
    bike: 'Bike Insurance',
    home: 'Home Insurance',
};

export default function ClickableCardOptions() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;
        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`action-tabpanel-${index}`}
                aria-labelledby={`action-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        {children}
                    </Box>
                )}
            </Typography>
        );
    };

    const a11yProps = (index) => ({
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    });

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                width: 800,
                position: 'relative',
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
            }}
        >
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="action tabs example"
                >
                    <Tab label="Buy" {...a11yProps(0)} />
                    <Tab label="Renew" {...a11yProps(1)} />
                    <Tab label="Claims" {...a11yProps(2)} />
                    <Tab label="Help" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Box>
                        <Typography variant="h6">Choose Insurance Type</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
                            {Object.keys(iconLinks).map((key) => (
                                <Card key={key} sx={{ maxWidth: 160 }}>
                                    <CardActionArea onClick={() => console.log(`Clicked on ${key}`)}>
                                        <Avatar
                                            src={iconLinks[key]}
                                            sx={{
                                                width: 76,
                                                height: 76,
                                                margin: 'auto',
                                                marginTop: 2,
                                                backgroundSize: 'contain',
                                            }}
                                            imgProps={{
                                                style: {
                                                    objectFit: 'contain',
                                                },
                                            }}
                                        />
                                        <CardContent>
                                            <Typography variant="caption" component="div" align="center">
                                                {iconLabels[key]}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Typography variant="h6">Renew your insurance</Typography>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Typography variant="h6">File a claim</Typography>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <Typography variant="h6">How can we help you?</Typography>
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}
