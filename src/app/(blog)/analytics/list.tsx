'use client';
import {Card, Container, List, ListItem, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {CalendarMonth, Visibility} from "@mui/icons-material";

interface Props {
  data:any;
}
export default function BlogList(props:Props){
  const {data} = props;
  console.log(props.data);
  return(
    <Container maxWidth={false}>
      <List sx={{width: '100%', maxWidth: 980, margin:'0 auto'}}>
        {
          data.map((el:any, index:number):JSX.Element => {
            return (
              <ListItem alignItems="flex-start" key={`blogListItem-${index}`}>
                <Card sx={{width: '100%', padding: 2}}>
                  <Typography gutterBottom variant="h6" component="div">{el.title}</Typography>
                  <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                    <Typography variant="body2" color="text.secondary">{el.company}</Typography>
                    <Box sx={{display:'flex', gap:2}}>
                      <Box sx={{display:'flex', gap:1}}>
                        <CalendarMonth fontSize={"small"}/>
                        <Typography variant="body2" color="text.secondary" sx={{flex:1}}>{el.date}</Typography>
                      </Box>
                      <Box sx={{display:'flex', gap:1, minWidth: '50px'}}>
                        <Visibility fontSize={"small"}/>
                        <Typography variant="body2" color="text.secondary" sx={{flex:1}}>{el.view}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </ListItem>
            );
          })
        }
      </List>
    </Container>
  )
}