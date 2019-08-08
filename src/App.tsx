import React, { useState } from 'react';
import Product from "./Product"
import SelectedItems from "./SelectedItems"
import TotalPrice from "./TotalPrice"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    inCheckut: {
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    darkPaper:{
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      textAlign: 'center',
      color: "white",
      backgroundColor: "gray"
    }
  }),
);
interface ProductList {
  name: string;
  price: number;
  img: string;
  quantity: number;
  tillFree: number;
}


const App: React.FC = () => {
  const classes = useStyles();

  const [selItem, setSelItem] = useState<ProductList[]>([])
  function lookForDupes(object: ProductList, currentState: ProductList[]) {
    for (let x of currentState) {
      if (object.name === x.name) {
        if (x.tillFree === 0) {
          x.tillFree = 2;
          x.quantity++;
        }
        x.tillFree--;
        x.quantity++;
        console.log(`Items till free! ${x.tillFree}`)
        setSelItem([...currentState])
        return
      }
    }
    object.tillFree--;
    setSelItem([...currentState, object])
  }

  function sumPrices(items: ProductList[]): number {
    let price = 0
    for (let x of items) {
      let quantity = (x.quantity - (Math.floor(x.quantity / 3)))
      console.log(x.price * x.quantity)
      price += (x.price * quantity)
    }
    return price;
  }


  let items: ProductList[] = [
    {
      name: "P90",
      price: 2350,
      img: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_p90_cu_p90-asiimov_light_large.0ca7f7fc032c98c5cc506ccde92b33e5836a8a88.png",
      quantity: 1,
      tillFree: 1
    },
    {
      name: "M4A1",
      price: 3100,
      img: "https://vignette.wikia.nocookie.net/cswikia/images/7/77/CSGO_M4A4_Inventory.png/revision/latest/scale-to-width-down/250?cb=20130813202347",
      quantity: 1,
      tillFree: 1
    },
    {
      name: "AUG",
      price: 3300,
      img: "https://vignette.wikia.nocookie.net/cswikia/images/9/92/CSGO_AUG_Inventory.png/revision/latest/scale-to-width-down/250?cb=20130813202013",
      quantity: 1,
      tillFree: 1
    },

  ]
  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };
  const [state, setState] = React.useState({
    checkedA: false,
  });
  return (

    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Typography component="div" style={{ backgroundColor: state.checkedA?"#cfe8fc":"gray", height: '100vh' }}>

          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={state.checkedA?classes.paper:classes.darkPaper}>Welcome to our shop!
                <Switch
                    checked={state.checkedA}
                    onChange={handleChange('checkedA')}
                    value="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={state.checkedA?classes.paper:classes.darkPaper}>
                  {items.map(thing => (
                    <Product
                      name={thing.name}
                      price={thing.price}
                      img={thing.img}
                      click={() => (
                        lookForDupes(thing, selItem)
                      )}
                      dark={state.checkedA}
                    />
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={state.checkedA?classes.paper:classes.darkPaper}>
                  <Grid item xs={12}>
                    <Paper className={state.checkedA?classes.paper:classes.darkPaper}>
                      {/* To trigger some people */}
                      <h1>You're cart!</h1>
                      {selItem.map((item, i) => (
                        <SelectedItems
                          name={item.name}
                          quantity={item.quantity}
                          img={item.img}
                          dark={state.checkedA}
                          free={Math.floor(item.quantity/3)}
                          onRemove={() => {
                            selItem.splice(i, 1)
                            setSelItem([...selItem])
                          }
                          } />
                      ))}
                    </Paper>
                  </Grid><Grid item xs={12}>
                    <Paper className={state.checkedA?classes.paper:classes.darkPaper}>
                      <TotalPrice
                        price={sumPrices(selItem)}
                      />
                    </Paper>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Typography>
      </Container>
    </React.Fragment>



  )
}

export default App;
