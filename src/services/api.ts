import {
  ApplausePost,
  CreateApplauseDto,
  PaginatedResponse,
  RecognitionType,
  User,
} from "../types";

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Rafael Hans",
    email: "rafael.hans@example.com",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: "2",
    name: "Thainá Ricarte",
    email: "thaina.ricarte@example.com",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: "3",
    name: "Carlos Eduardo Correa",
    email: "carlos.correa@example.com",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    id: "4",
    name: "Isabela Almeida",
    email: "isabela.almeida@example.com",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    id: "5",
    name: "Fernando Souza",
    email: "fernando.souza@example.com",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    id: "6",
    name: "Juliana Castro",
    email: "juliana.castro@example.com",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    id: "7",
    name: "Marcos Vinícius",
    email: "marcos.vinicius@example.com",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    id: "8",
    name: "Patrícia Lima",
    email: "patricia.lima@example.com",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: "9",
    name: "Renato Faria",
    email: "renato.faria@example.com",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    id: "10",
    name: "Camila Duarte",
    email: "camila.duarte@example.com",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    id: "11",
    name: "Lucas Pires",
    email: "lucas.pires@example.com",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    id: "12",
    name: "Aline Martins",
    email: "aline.martins@example.com",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    id: "13",
    name: "Eduardo Moreira",
    email: "eduardo.moreira@example.com",
    avatar: "https://randomuser.me/api/portraits/men/27.jpg",
  },
  {
    id: "14",
    name: "Vanessa Silveira",
    email: "vanessa.silveira@example.com",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    id: "15",
    name: "Fábio Ferreira",
    email: "fabio.ferreira@example.com",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
  },
  {
    id: "16",
    name: "Bianca Azevedo",
    email: "bianca.azevedo@example.com",
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
  },
  {
    id: "17",
    name: "Henrique Barros",
    email: "henrique.barros@example.com",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    id: "18",
    name: "Luciana Melo",
    email: "luciana.melo@example.com",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: "19",
    name: "Daniel Costa",
    email: "daniel.costa@example.com",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    id: "20",
    name: "Tatiane Ramos",
    email: "tatiane.ramos@example.com",
    avatar: "https://randomuser.me/api/portraits/women/34.jpg",
  },
];

const recognitionTypes: RecognitionType[] = [
  { id: "1", emoji: "😍", name: "Impressionante!" },
  { id: "2", emoji: "🙏", name: "Obrigado!" },
  { id: "3", emoji: "🙌", name: "Bom trabalho!" },
  { id: "4", emoji: "✨", name: "Extraordinário!" },
];

let mockPosts: ApplausePost[] = [
  {
    id: "1",
    author: mockUsers[2], // Carlos Eduardo Correa
    recipient: mockUsers[1], // Thainá Ricarte
    recognitionType: recognitionTypes[0], // Impressionante!
    message: "Excelente trabalho na apresentação para o cliente!",
    image:
      "https://images.unsplash.com/photo-1612831455540-07bb7b8b724e?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-01T09:10:00Z",
  },
  {
    id: "2",
    author: mockUsers[1], // Thainá Ricarte
    recipient: mockUsers[0], // Rafael Hans
    recognitionType: recognitionTypes[1], // Obrigado!
    message: "Obrigada pela ajuda na entrega do relatório.",
    image:
      "https://images.unsplash.com/photo-1602526216345-84f9f7f243b3?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-02T10:15:00Z",
  },
  {
    id: "3",
    author: mockUsers[0], // Rafael Hans
    recipient: mockUsers[2], // Carlos Eduardo Correa
    recognitionType: recognitionTypes[2], // Bom trabalho!
    message: "Ótima liderança no projeto de integração.",
    image:
      "https://images.unsplash.com/photo-1600180758890-4fcba1f4c17d?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-03T14:20:00Z",
  },
  {
    id: "4",
    author: mockUsers[2], // Carlos Eduardo Correa
    recipient: mockUsers[0], // Rafael Hans
    recognitionType: recognitionTypes[3], // Extraordinário!
    message: "Sua dedicação no fechamento do trimestre foi essencial!",
    image:
      "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-04T11:30:00Z",
  },
  {
    id: "5",
    author: mockUsers[1], // Thainá Ricarte
    recipient: mockUsers[2], // Carlos Eduardo Correa
    recognitionType: recognitionTypes[0], // Impressionante!
    message: "Parabéns pela inovação no processo de onboarding.",
    image:
      "https://images.unsplash.com/photo-1601758174640-bb0c0a59f3e2?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-05T13:45:00Z",
  },
  {
    id: "6",
    author: mockUsers[0], // Rafael Hans
    recipient: mockUsers[1], // Thainá Ricarte
    recognitionType: recognitionTypes[1], // Obrigado!
    message: "Agradeço pelo suporte técnico na última reunião.",
    image:
      "https://images.unsplash.com/photo-1616448622539-0cfb7239c7aa?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-06T15:50:00Z",
  },
  {
    id: "7",
    author: mockUsers[2], // Carlos Eduardo Correa
    recipient: mockUsers[0], // Rafael Hans
    recognitionType: recognitionTypes[2], // Bom trabalho!
    message: "Ótima apresentação no workshop de tecnologia.",
    image:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-07T09:25:00Z",
  },
  {
    id: "8",
    author: mockUsers[1], // Thainá Ricarte
    recipient: mockUsers[0], // Rafael Hans
    recognitionType: recognitionTypes[3], // Extraordinário!
    message: "Sua colaboração foi essencial para o sucesso do evento.",
    image:
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-08T12:40:00Z",
  },
  {
    id: "9",
    author: mockUsers[2], // Carlos Eduardo Correa
    recipient: mockUsers[1], // Thainá Ricarte
    recognitionType: recognitionTypes[0], // Impressionante!
    message: "Parabéns pelo excelente desempenho no treinamento.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-09T08:55:00Z",
  },
  {
    id: "10",
    author: mockUsers[0], // Rafael Hans
    recipient: mockUsers[2], // Carlos Eduardo Correa
    recognitionType: recognitionTypes[1], // Obrigado!
    message: "Obrigado pelo suporte na integração de sistemas.",
    image:
      "https://images.unsplash.com/photo-1526401281623-3f20ded6b5c1?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-10T10:10:00Z",
  },
  {
    id: "11",
    author: mockUsers[1], // Thainá Ricarte
    recipient: mockUsers[2], // Carlos Eduardo Correa
    recognitionType: recognitionTypes[2], // Bom trabalho!
    message: "Ótima análise de dados para o relatório mensal.",
    image:
      "https://images.unsplash.com/photo-1531497865147-6e85e04ac58b?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-11T11:15:00Z",
  },
  {
    id: "12",
    author: mockUsers[2], // Carlos Eduardo Correa
    recipient: mockUsers[1], // Thainá Ricarte
    recognitionType: recognitionTypes[3], // Extraordinário!
    message: "Contribuição incrível no desenvolvimento da nova feature.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-12T09:50:00Z",
  },
  {
    id: "13",
    author: mockUsers[0], // Rafael Hans
    recipient: mockUsers[1], // Thainá Ricarte
    recognitionType: recognitionTypes[0], // Impressionante!
    message: "Parabéns pelo design da nova interface!",
    image:
      "https://images.unsplash.com/photo-1564869735327-d9f5d6ce8de5?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-13T14:05:00Z",
  },
  {
    id: "14",
    author: mockUsers[2], // Carlos Eduardo Correa
    recipient: mockUsers[0], // Rafael Hans
    recognitionType: recognitionTypes[1], // Obrigado!
    message: "Obrigado por ajudar na revisão do código.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-14T15:20:00Z",
  },
  {
    id: "15",
    author: mockUsers[1], // Thainá Ricarte
    recipient: mockUsers[2], // Carlos Eduardo Correa
    recognitionType: recognitionTypes[2], // Bom trabalho!
    message: "Ótima facilitação na reunião de equipe.",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-15T10:30:00Z",
  },
  {
    id: "16",
    author: mockUsers[0], // Rafael Hans
    recipient: mockUsers[1], // Thainá Ricarte
    recognitionType: recognitionTypes[3], // Extraordinário!
    message: "Participação brilhante no hackathon interno.",
    image:
      "https://images.unsplash.com/photo-1542224566-0d62b98f1388?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-16T14:10:00Z",
  },
  {
    id: "17",
    author: mockUsers[2], // Carlos Eduardo Correa
    recipient: mockUsers[0], // Rafael Hans
    recognitionType: recognitionTypes[0], // Impressionante!
    message: "Parabéns pela proposta criativa para o novo produto.",
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-17T12:45:00Z",
  },
  {
    id: "18",
    author: mockUsers[1], // Thainá Ricarte
    recipient: mockUsers[2], // Carlos Eduardo Correa
    recognitionType: recognitionTypes[1], // Obrigado!
    message: "Obrigado pelo compartilhamento de conhecimento no treinamento.",
    image:
      "https://images.unsplash.com/photo-1603575448855-39e33d6c23ab?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-18T09:35:00Z",
  },
  {
    id: "19",
    author: mockUsers[0], // Rafael Hans
    recipient: mockUsers[2], // Carlos Eduardo Correa
    recognitionType: recognitionTypes[2], // Bom trabalho!
    message: "Ótima organização do cronograma do projeto.",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-19T11:25:00Z",
  },
  {
    id: "20",
    author: mockUsers[2], // Carlos Eduardo Correa
    recipient: mockUsers[1], // Thainá Ricarte
    recognitionType: recognitionTypes[3], // Extraordinário!
    message: "Contribuição incrível no sprint de inovação.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-06-20T14:50:00Z",
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  async getFeed(
    page: number = 1,
    limit: number = 5
  ): Promise<PaginatedResponse<ApplausePost>> {
    await delay(800);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = mockPosts.slice(startIndex, endIndex);

    return {
      data: paginatedPosts,
      page,
      limit,
      total: mockPosts.length,
      hasNextPage: endIndex < mockPosts.length,
    };
  },

  async getUsers(
    page: number = 1,
    limit: number = 20,
    search?: string
  ): Promise<PaginatedResponse<User>> {
    await delay(500);

    let filteredUsers = mockUsers;

    if (search) {
      filteredUsers = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      page,
      limit,
      total: filteredUsers.length,
      hasNextPage: endIndex < filteredUsers.length,
    };
  },

  async getRecognitionTypes(): Promise<RecognitionType[]> {
    await delay(300);
    return recognitionTypes;
  },

  async createApplause(data: CreateApplauseDto): Promise<ApplausePost> {
    await delay(1000);

    const author = mockUsers[0]; // Simulating current user
    const recipient = mockUsers.find((u) => u.id === data.recipientId);
    const recognitionType = recognitionTypes.find(
      (rt) => rt.id === data.recognitionTypeId
    );

    if (!recipient || !recognitionType) {
      throw new Error("Recipient or recognition type not found");
    }

    const newPost: ApplausePost = {
      id: Date.now().toString(),
      author,
      recipient,
      recognitionType,
      message: data.message,
      image: data.image,
      createdAt: new Date().toISOString(),
    };

    mockPosts.unshift(newPost);
    return newPost;
  },
};
