import { Box, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';

interface ResultPanelProps {
  imageUrl: string | null;
  error: string | null;
  loading: boolean;
}

function ResultPanel({ imageUrl, error, loading }: ResultPanelProps) {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" component="h2" fontWeight={500}>
            渲染结果
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            overflow: 'auto',
            bgcolor: 'background.default',
          }}
        >
          {loading && (
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress size={48} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                正在生成图片...
              </Typography>
            </Box>
          )}

          {error && !loading && (
            <Alert severity="error" sx={{ width: '100%', maxWidth: 600 }}>
              {error}
            </Alert>
          )}

          {imageUrl && !loading && (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src={imageUrl}
                alt="Generated"
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Box>
          )}

          {!imageUrl && !loading && !error && (
            <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
              <ImageIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
              <Typography variant="body1">
                点击"渲染图片"按钮生成图片
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default ResultPanel;

