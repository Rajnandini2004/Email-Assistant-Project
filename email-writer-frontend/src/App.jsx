import axios from 'axios';
import { useState } from 'react'
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import './App.css'

function App() {
  const[emailContent, setEmailContent] = useState('');
  const[tone, setTone] = useState('');
  const[generateReply, setGenerateReply] = useState('');
  const[loading, setLoading] = useState(false);


  const handleSubmit =  async () => {
      setLoading (true);
      try {
        const response = await axios.post("http://localhost:8080/api/email/generate", {
          emailContent,
          tone
        });
        setGeneratedReply(typeof response.data === 'string' ?
          response.data : JSON.stringify(response.data)
        );
      } catch (error) {
        
      }finally {
        setLoading(false);
      }
   };


  return (
    <Container maxWidth='md' sx={{py:4}}>
      <Typography variant='h3' component='h1' gutterBottom>
        Email Reply Generator 
      </Typography>

      <Box sx={{mx: 3}}>
        <TextField
        fullWidth
        multiline
        rows={6}
        variant='outlined'
        label="Original Email Content"
        value={emailContent || ''}
        onChange={(e) => setEmailContent(e.target.value)}
        sx={{mb:2}}
        />
        <FormControl fullWidth sx={{mb:2}}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone || ''}
              label="Tone (Optional)"
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
        </FormControl>
        <Button variant="contained"
        sx= {{ mb:2 }}
        onClick={handleSubmit}
         disabled= {!emailContent || loading}>
          {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
      </Button>
      </Box>

      <Box sx={{mx: 3}}>
        <TextField
        fullWidth
        multiline
        rows={6}
        variant='outlined'
        value={generateReply || ''}
        inputProps={{readonly: true}}
        sx={{mb:2}}
        />

        <Button 
        variant='outlined'
        onClick={() => navigator.clipboard.write(generateReply)}>
          Copy to Clipboard
        </Button>
      </Box>
      

    </Container>

  )
}

export default App
