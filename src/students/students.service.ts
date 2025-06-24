process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as https from 'https';

@Injectable()
export class StudentsService {
  private readonly KINTONE_BASE_URL = 'https://qmmtawzjw7cs.kintone.com/k/v1/records.json';
  private readonly APP_ID = 8;
  private readonly API_TOKEN = 'PisBx8JPEucIAfAUCxcVPJcEtl1joFN7UEQVpnyQ';

   constructor(
    @InjectRepository(Student)
    private recordRepo: Repository<Student>,
  ) {}
  
  async getDataFromKintone() {
    try {
    

    const response = await axios.request({
      method: 'GET',
      url: this.KINTONE_BASE_URL,
      headers: {
        'X-Cybozu-API-Token': this.API_TOKEN,
        'Content-Type': 'application/json',
      },
      params: {
        app: this.APP_ID,
      },
     
      httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Thêm dòng này
    });

      return response.data.records;
    } catch (error) {
      console.error('Error fetching from Kintone:', error.response?.data || error.message);
      throw error;
    }
  }


  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
