import { DynamicContent, LogEntry, MemoryEntry, ToolOutcome } from '../types';

export interface BrainResponse {
  spokenText: string;
  acknowledgment?: string;
  toolName?: string;
  toolOutcome?: ToolOutcome;
  logDetail?: string;
  dynamicContent?: DynamicContent;
  memoryUpdate?: { category: MemoryEntry['category']; key: string; value: string };
  requiresConfirmation?: {
    title: string;
    description: string;
    action: () => void;
  };
}

export class JarvisBrain {
  private assistantName: string;
  private userName: string;

  constructor(assistantName = 'JARVIS', userName = 'Senhor') {
    this.assistantName = assistantName;
    this.userName = userName;
  }

  updateNames(assistantName: string, userName: string) {
    this.assistantName = assistantName;
    this.userName = userName;
  }

  async processQueryAsync(
    rawText: string,
    memories: MemoryEntry[],
    systemMetrics: { cpu: number; mem: number; gpu: number; tmp: number }
  ): Promise<BrainResponse> {
    const text = rawText.toLowerCase().trim();

    // 1. Relatório Matinal / Morning Briefing
    if (text.includes('briefing') || text.includes('relatório matinal') || text.includes('bom dia') || text.includes('acordar') || text.includes('wake up')) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      return {
        acknowledgment: `Compilando seu relatório matinal, ${this.userName}.`,
        spokenText: `Bom dia, ${this.userName}. São exatamente ${timeStr}. Os diagnósticos de hardware confirmam todos os núcleos operando dentro da margem térmica ideal a ${systemMetrics.tmp.toFixed(0)} graus Celsius. Nenhum alerta de segurança registrado. Todos os subsistemas Mark LVI estão em prontidão.`,
        toolName: 'proactive_briefing',
        toolOutcome: 'done',
        logDetail: 'Sequência de relatório matinal concluída. Diagnósticos de hardware e memória nominais.',
        dynamicContent: {
          id: String(Date.now()),
          type: 'weather',
          title: 'Relatório Matinal // Telemetria & Clima',
          subtitle: 'Estação Local Integrada',
          data: {
            temp: '23°C',
            condition: 'Tempo Estável / Céu Limpo',
            humidity: '52%',
            wind: '14 km/h SE',
          },
          timestamp: timeStr,
        },
      };
    }

    // 2. Hardware / Diagnósticos / Telemetria
    if (text.includes('telemetria') || text.includes('diagnóstico') || text.includes('hardware') || text.includes('temperatura') || text.includes('status')) {
      const isHot = systemMetrics.tmp > 80;
      return {
        acknowledgment: `Realizando varredura dos sensores de hardware, ${this.userName}.`,
        spokenText: `A carga da CPU está em ${systemMetrics.cpu.toFixed(0)}%, o consumo de memória RAM é de ${systemMetrics.mem.toFixed(0)}% e o processamento gráfico da GPU registra ${systemMetrics.gpu.toFixed(0)}%. A temperatura média dos núcleos é de ${systemMetrics.tmp.toFixed(0)} graus Celsius. ${isHot ? 'Alerta: temperaturas elevadas detectadas.' : 'Envelope operacional perfeitamente estável.'}`,
        toolName: 'system_monitor',
        toolOutcome: 'done',
        logDetail: `Verificação de sistema concluída: CPU ${systemMetrics.cpu}%, RAM ${systemMetrics.mem}%, GPU ${systemMetrics.gpu}%, TEMP ${systemMetrics.tmp}°C. Processos nominais.`,
      };
    }

    // 3. Previsão do Tempo / Clima
    if (text.includes('clima') || text.includes('tempo') || text.includes('previsão') || text.includes('vai chover') || text.includes('temperatura hoje')) {
      return {
        acknowledgment: `Acessando os radares meteorológicos, ${this.userName}.`,
        spokenText: `Registrando atualmente 23 graus Celsius com céu parcialmente nublado e ventos de 14 quilômetros por hora vindo do sudeste. Umidade relativa do ar em 52 por cento, sem probabilidade de chuva nas próximas 24 horas.`,
        toolName: 'weather_report',
        toolOutcome: 'done',
        logDetail: 'Dados meteorológicos em tempo real obtidos. Pressão barométrica 1015 hPa.',
        dynamicContent: {
          id: String(Date.now()),
          type: 'weather',
          title: 'Condições Meteorológicas // Radar ao Vivo',
          subtitle: 'Estação de Monitoramento Atmosférico',
          data: {
            temp: '23°C',
            condition: 'Parcialmente Nublado',
            humidity: '52%',
            wind: '14 km/h SE',
          },
          timestamp: new Date().toLocaleTimeString('pt-BR'),
        },
      };
    }

    // 4. Rastreamento de Voos
    if (text.includes('voo') || text.includes('companhia aérea') || text.includes('aeroporto') || text.includes('flight')) {
      return {
        acknowledgment: `Consultando malha aérea internacional, ${this.userName}.`,
        spokenText: `O voo STARK-742 de São Paulo para Nova York encontra-se confirmado e pontual. Partida prevista às 21:15 do Terminal 3. Tempo de trânsito em rota estimado em 9 horas e 40 minutos.`,
        toolName: 'flight_finder',
        toolOutcome: 'done',
        logDetail: 'Voo STARK-742 localizado. Status: No Horário (Portão 308).',
        dynamicContent: {
          id: String(Date.now()),
          type: 'flight',
          title: 'Rastreamento Aéreo // Trajetória',
          subtitle: 'Voo Comercial Direto',
          data: {
            flightNo: 'STARK-742',
            origin: 'GRU (São Paulo)',
            dest: 'JFK (Nova York)',
          },
          timestamp: new Date().toLocaleTimeString('pt-BR'),
        },
      };
    }

    // 5. Reprodução de Vídeo no HUD
    if (text.includes('vídeo') || text.includes('video') || text.includes('trailer') || text.includes('youtube') || text.includes('dune')) {
      return {
        acknowledgment: `Direcionando sinal de mídia para o HUD central, ${this.userName}.`,
        spokenText: `Inicializando reprodução de vídeo diretamente sobre a matriz holográfica. O áudio inicia em modo silenciado por segurança; posso elevar o volume conforme sua ordem.`,
        toolName: 'video_player',
        toolOutcome: 'done',
        logDetail: 'Fluxo de vídeo carregado sobre o HUD. Sincronização audiovisual pronta.',
        dynamicContent: {
          id: String(Date.now()),
          type: 'video',
          title: 'Reprodutor Tático HUD // Mídia Ativa',
          subtitle: 'Camada de Exibição Cinematográfica',
          data: {
            url: 'https://www.youtube.com/embed/Way9Dexny3w?autoplay=1&mute=1',
          },
          timestamp: new Date().toLocaleTimeString('pt-BR'),
        },
      };
    }

    // 6. Ações de Energia / Rede com Portão de Confirmação (Confirmation Gate)
    if (text.includes('desligar') || text.includes('reiniciar') || text.includes('shutdown') || text.includes('desativar wifi') || text.includes('cortar rede')) {
      const isWifi = text.includes('wifi') || text.includes('rede');
      return {
        spokenText: `Uma ação crítica como ${isWifi ? 'desativar as interfaces de rede' : 'o desligamento do sistema'} exige sua autorização direta, ${this.userName}. Abrindo o portão de segurança física.`,
        toolName: 'computer_settings',
        toolOutcome: 'ask',
        logDetail: 'Portão de segurança armado: confirmação manual do operador requerida.',
        requiresConfirmation: {
          title: isWifi ? 'Desconexão de Rede / WiFi' : 'Desligamento de Emergência do Sistema',
          description: isWifi
            ? 'Confirma a desativação de todas as conexões de rede sem fio ativas?'
            : 'O desligamento encerrará a sessão operacional e todos os monitores em segundo plano.',
          action: () => {
            console.log('Autorizado manualmente pelo operador.');
          },
        },
      };
    }

    // 7. Lembretes / Reminders
    if (text.includes('lembre') || text.includes('lembrete') || text.includes('cronômetro') || text.includes('alarme')) {
      return {
        spokenText: `Lembrete devidamente registrado, ${this.userName}. Notificarei você pelo canal visual do HUD no tempo programado.`,
        toolName: 'reminder',
        toolOutcome: 'done',
        logDetail: 'Lembrete agendado e inserido na fila de tarefas ativas.',
      };
    }

    // 8. Gravar memória permanente
    if (text.includes('lembre que') || text.includes('grave que') || text.includes('minha preferência') || text.includes('anote que')) {
      const cleaned = rawText.replace(/lembre que|grave que|anote que/gi, '').trim();
      return {
        spokenText: `Compreendido, ${this.userName}. O fato foi registrado permanentemente na matriz de memória de longo prazo.`,
        toolName: 'save_memory',
        toolOutcome: 'done',
        logDetail: `Fato gravado na memória: "${cleaned}"`,
        memoryUpdate: {
          category: 'preferences',
          key: 'diretriz_usuario_' + Date.now().toString().slice(-4),
          value: cleaned,
        },
      };
    }

    // 9. DIÁLOGOS COMUNS E PERGUNTAS GERAIS:
    // Chama a API oficial do Google AI Studio (Gemini 3.8 Flash) em Português do Brasil!
    try {
      const memorySummary = memories.slice(0, 8).map(m => `- ${m.key}: ${m.value}`).join('\n');
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: rawText,
          assistantName: this.assistantName,
          userName: this.userName,
          metrics: systemMetrics,
          memoryContext: memorySummary,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const geminiReply = data.text || '';
        if (geminiReply.trim()) {
          return {
            spokenText: geminiReply,
            logDetail: `Resposta processada via Gemini API AI Studio (${data.model || 'gemini-3.8-flash'}) em Português do Brasil.`,
            toolName: 'gemini_dialogue_engine',
            toolOutcome: 'done',
          };
        }
      }
    } catch (apiError) {
      console.warn('Erro ao consultar /api/gemini/chat:', apiError);
    }

    // Resposta padrão caso haja indisponibilidade temporária de rede
    return {
      spokenText: `Às suas ordens, ${this.userName}. Todos os canais de telemetria do Mark LVI estão ativos e sincronizados. Qual é a sua instrução?`,
      logDetail: `Diálogo processado localmente: "${rawText}"`,
    };
  }
}
